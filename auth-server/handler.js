/*
 Added by default when generate serverless template
 makes code in file well, strict and reduce JavaScript Sloppiness*/
'use strict';

// Importing required Google packages
const { google } = require('googleapis');
const calendar = google.calendar('v3');

/**
 * SCOPES allows you set access levels
 * We defined "read-only access" when we set up required infrastructure
 * in Google console.
 * Any scopes passed, the users will see in consent screen.
 */
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];

// process.env is best practice, meaning the value being referred to is in config.json
// Keeps API secrets hidden
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://sogolsa.github.io/meet/'];

/* Using the new operator, a new instance of google.auth.OAuth2 method
was called and created.
First step in OAuth process is to generate a URL so users can log in
with Google and be authorized to see the calendar events data.
After logging in users will receive a code as a URL parameter
So far we only have only one redirect URL in the array. so first element index is 0 */
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

// getAuthURL is created and exported using Node.js module.exports
/* Another module in getAuthURL function is oAuth2Client which allows you
to retrieve an access token, refresh it, and retry request. */
module.exports.getAuthURL = async () => {
  // To generate authentication URL from Google API calling the oAuth2Client.generateAuthUrl method.
  const authUrl = oAuth2Client.generateAuthUrl({
    // access type and scope were set in variable scopes earlier.
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// Step 2
module.exports.getAccessToken = async (event) => {
  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
     */
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

// Step 3
module.exports.getCalendarEvents = async (event) => {
  console.log('inside get Calendar Events');
  const access_token = decodeURIComponent(
    `${event.pathParameters.access_token}`
  );

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          console.log('calendar error');
          return reject(error);
        } else {
          console.log('calendar successs');
          return resolve(response);
        }
      }
    );
  })
    .then((results) => {
      console.log(results);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      console.log('get calendar error');
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
