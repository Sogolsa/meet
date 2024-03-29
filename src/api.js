// Handling API calls
import mockData from './mock-data';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

// remove unnecessary query parameters from url(less complicated url for user)
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://pwququfjl0.execute-api.us-east-2.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

//This function takes the access token and checks if it's valid or not
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};
// This function will fetch the list of all events
export const getEvents = async () => {
  NProgress.start();
  // limiting mock data to local host
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }

  // The user is offline? then the stored event list will be loaded
  // no need to check access token if the user is offline, hence this code is before token
  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url =
      'https://pwququfjl0.execute-api.us-east-2.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      NProgress.done();
      // Events is an array but localStorage can only strings
      localStorage.setItem('lastEvents', JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};

// Integrating authorization server into app so users can access Google Calendar API
// First get the access token
export const getAccessToken = async () => {
  // look into local storage and check if user has access token
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const response = await fetch(
        'https://pwququfjl0.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url'
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
