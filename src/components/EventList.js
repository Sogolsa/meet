import Event from './Event';

const EventList = ({ events }) => {
  /* Loops over the events prop and in each iteration
   render and <Event /> component, making sure the .map() loop
   is only executed if events is defined */

  return (
    <ul id='event-list'>
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
