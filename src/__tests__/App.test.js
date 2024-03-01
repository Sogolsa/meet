/* Function that you’ll use to mock an accurate representation
 of the original React component, allows for high-quality testing */
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

// Creating a new scope via describe function (makes managing tests easier)
describe('<App /> component', () => {
  /* render(<App />).container doesn't reference the DOM node
    That's why we append the .firstChild */
  let AppDOM;

  beforeEach(() => {
    // This will run before each test
    AppDOM = render(<App />).container.firstChild;
  });

  /* First parameter is description of test,
    second parameter is a function that contains the test code*/
  test('renders list of events', () => {
    /**
     * Check if App component contains list of events,
     * Check if there is an element that has id event-list,
     * inside AppDOM and exists in document. toBeInTheDocument is matcher function
     */
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    // const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    //User event is set and app component and it's DOM are mocked
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // A reference to CitySearchComponent root DOM node is initialized
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    // A query is performed to find the city input textbox in it
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    // Simulating typing Berlin in the city textbox and clicking on Berlin, Germany
    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    // Querying #event-list(eventList component root node DOM), affecting EventList after click
    const EventListDOM = AppDOM.querySelector('#event-list');
    // finds what Event list item is rendered inside it
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole('listitem');

    // Gets a list of all events from the mock data that are located in “Berlin, Germany”.
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === 'Berlin, Germany'
    );

    /* Comparing the number of events located in "Berlin, Germany"
     with the array of rendered Event list items, expecting them to have the same length.*/
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    // Make sure all of the items contain text Berlin, Germany
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain('Berlin, Germany');
    });
  });

  test('user can change the number of events displayed', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // find the input field in number of events component
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const numberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole('textbox');

    // Change the number of events to 10
    if (numberOfEventsInput) {
      await userEvent.clear(numberOfEventsInput);
      await userEvent.type(numberOfEventsInput, '{backspace}{backspace}10');
    }

    // Wait for the state to update and events to be re-rendered
    await waitFor(() => {
      // find the EventList component
      const EventListDOM = AppDOM.querySelector('#event-list');

      // Find all rendered event items
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toEqual(10);
    });
  });
});
