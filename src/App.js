import { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

import './App.css';

const App = () => {
  /*currentNOE (current “number of events”)
   * is the app's global state representing the current number of events
   */
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  // For optimization of loading time when the app is initially opened.
  const fetchInitialData = async () => {
    try {
      const allEvents = await getEvents();
      setAllLocations(extractLocations(allEvents));
      setEvents(allEvents);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // Populate the events state with events list from fetch
  const fetchData = async () => {
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
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert(
        'Warning: You are currently offline. The displayed list has been loaded from the cache and may not be up to date'
      );
    }
    fetchData();
  }, [currentCity, currentNOE]); // fetchData is called whenever there is a change in currentCity

  return (
    <div className='App'>
      <h1 className='title'>MEET APP</h1>
      <div className='alerts-container'>
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
        {errorAlert.length > 0 && <ErrorAlert text={errorAlert} />}
        {warningAlert.length > 0 && <WarningAlert text={warningAlert} />}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className='charts-container'>
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;
