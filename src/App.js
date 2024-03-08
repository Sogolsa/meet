import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  /*currentNOE (current “number of events”)
   * is the app's global state representing the current number of events
   */
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [loading, setLoading] = useState(true);

  // For optimization of loading time when the app is initially opened.
  const fetchInitialData = async () => {
    // setLoading(true);
    const allEvents = await getEvents();
    setAllLocations(extractLocations(allEvents));
    setEvents(allEvents);
    // setLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Populate the events state with events list from fetch
  const fetchData = async () => {
    setLoading(false);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    // Extract elements from index 0 up to currentNOE which is 32 (first 32 events)
    if (filteredEvents !== undefined) {
      setEvents(filteredEvents.slice(0, currentNOE));
    }
    setAllLocations(extractLocations(allEvents));
  };

  // Populate the list as soon as the App Component is mounted.
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]); // fetchData is called whenever there is a change in currentCity

  return (
    <div className='App'>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      {loading ? <p>Loading...</p> : <EventList events={events} />}
    </div>
  );
};

export default App;
