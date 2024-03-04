import { useState } from 'react';

const Event = ({ event }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <li className='event'>
      <h3>{event.summary}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button className='details-btn' onClick={handleToggleDetails}>
        {isDetailsVisible ? 'hide details' : 'show details'}
      </button>
      {isDetailsVisible && <div className='details'>{event.description}</div>}
    </li>
  );
};

export default Event;
