import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNumberOfEvents={() => {}} />
    );
  });

  test('NumberOfEvents component contains an element with the role textbox', () => {
    const numberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole('textbox');
    expect(numberOfEventsTextBox).toBeInTheDocument();
    expect(numberOfEventsTextBox).toHaveClass('number-of-events');
  });

  test('default value of the input field is 32', () => {
    const numberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole('textbox');

    // Check if the textbox element is present
    expect(numberOfEventsTextBox).toBeInTheDocument();

    // Check if the value of the input field is '32'
    expect(numberOfEventsTextBox).toHaveValue('32');
  });

  test("value of the NumberOfEvents component's textbox changes accordingly when typed", async () => {
    const numberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(numberOfEvents, '{backspace}{backspace}10');
    expect(numberOfEvents).toHaveValue('10');
  });
});
