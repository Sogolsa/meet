import { render, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test('render events with their summary when collapsed by default', () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test('render event start time correctly', () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test('renders event location correctly', () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test('renders event details button with the title(show details)', async () => {
    await waitFor(() => {
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
  });

  test('by default, events detail section should be hidden', () => {
    expect(
      EventComponent.container.querySelector('.details')
    ).not.toBeInTheDocument();
  });

  test('shows the details section when the user clicks on show details button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    await user.click(button, 'show details');
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hides the details section when the user clicks on hide details button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole('button');
    const details = EventComponent.container.querySelector('.details');
    await user.click(button, 'hide details');
    expect(details).not.toBeInTheDocument();
  });
});
