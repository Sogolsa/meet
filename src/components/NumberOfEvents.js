import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNumberOfEvents }) => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    setCurrentNumberOfEvents(value);
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
