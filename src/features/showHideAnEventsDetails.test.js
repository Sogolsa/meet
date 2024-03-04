import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  // Scenario 1
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;

    given('the user opens the app', () => {
      AppComponent = render(<App />);
    });

    when('the user sees the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const eventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(eventListItems.length).toBe(32);
      });
    });

    then('each event element should be collapsed by default', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventDetails = AppDOM.querySelector('.details');
        expect(eventDetails).not.toBeInTheDocument();
      });
    });
  });

  // Scenario 2
  test("User can expand an event to see it's details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the user sees the list of events', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const eventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(eventListItems.length).toBeGreaterThan(0);
      });
    });

    let EventDOM;
    when(
      'the user clicks on the show details button of that event',
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        EventDOM = AppDOM.querySelector('.details-btn');
        fireEvent.click(EventDOM);
      }
    );

    then('that event should be expanded with its details', () => {
      const details = AppComponent.container.querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({
    given,
    when,
    then,
  }) => {
    let EventComponent;
    let allEvents;
    given('the user can see the details of an event', async () => {
      allEvents = getEvents();
      EventComponent = render(<Event event={allEvents} />);
      const user = userEvent.setup();
      const button = EventComponent.queryByRole('button');
      await user.click(button, 'show details');
      const details = EventComponent.container.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    when('the user clicks on hide details button', async () => {
      const user = userEvent.setup();
      const button = EventComponent.queryByRole('button');
      await user.click(button, 'hide details');
    });

    then('the event element should collapse', () => {
      const details = EventComponent.container.querySelector('.details');
      expect(details).not.toBeInTheDocument();
      expect(
        EventComponent.queryByText('hide details')
      ).not.toBeInTheDocument();
    });
  });
});
