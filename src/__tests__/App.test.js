/* Function that you’ll use to mock an accurate representation
 of the original React component, allows for high-quality testing */
import { render } from '@testing-library/react';
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
