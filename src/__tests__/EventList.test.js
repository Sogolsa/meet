import { render, waitFor, within } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
  let EventListComponent;

  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    /* The events prop is set manually using mock data 
    (the minimum amount of data required for the component to be functional) */
    const allEvents = await getEvents();

    EventListComponent.rerender(<EventList events={allEvents} />);
    // Check if the number of rendered list items matches the number of events
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(
      allEvents.length
    );
  });
});

//Feature1: Filter Events by City (Scenario 1)
describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    // Access the fist child element of the container
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    /* waitFor() is useful if you need a way to query elements in the page that aren’t
     rendered immediately, expect is also inside waitFor because it’s tied to what’s returned
      from this delayed rendering update*/
    await waitFor(() => {
      // within allows you to use React Testing Library query functions on the passed DOM object
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});
