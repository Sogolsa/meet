import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    setCurrentNOE(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = 'Only positive numbers are allowed';
      setErrorAlert(errorText);
    } else {
      errorText = '';
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);
  };

  return (
    <div id='number-of-events'>
      <label htmlFor='numberOfEvents'>Number of Events:</label>
      <input
        type='text'
        id='numberOfEvents'
        className='number-of-events'
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
