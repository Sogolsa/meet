import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test("The user should see 32 events when they haven't specify the number.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    given('the user is on event app', () => {
      AppComponent = render(<App />);
    });

    when('the user has not specified the number', () => {
      AppDOM = AppComponent.container.firstChild;
    });
    then('the user should see 32 events by default', async () => {
      await waitFor(() => {
        const EventListDOM = AppDOM.querySelector('#event-list');
        const eventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(eventListItems).toHaveLength(32);
      });
    });
  });

  test('The user can change the number of events displayed by specifying the number.', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given('the user can see all the events when opens the app', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const eventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(eventListItems.length).toBeTruthy();
      });
    });

    let AppDOM;
    let NumberOfEventsDOM;
    let numberOfEventsInput;
    when(
      'the user specifies the number of events to be displayed',
      async () => {
        AppComponent = render(<App />);
        const user = userEvent.setup();
        AppDOM = AppComponent.container.firstChild;
        NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
        numberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
        await user.type(numberOfEventsInput, '{backspace}{backspace}10');
      }
    );

    then('the user should see only the number of events they specified', () => {
      AppDOM = AppComponent.container.firstChild;
      const eventList = within(AppDOM).queryAllByRole('listitem');
      expect(eventList.length).toEqual(10);
    });
  });
});
