# Meet APP

## Serverless Functions:

> To retrieve the event data from the Google Calendar, the client-side app needs to be authorized. This is where the serverless backend comes into play. Protected APIs can only be called by authenticated apps, apps that have a valid token issued by the API provider. Since Google Calender API is a protected API, in order ot access it we need a valid OAuth token.
> serverless functions can be used for providing access tokens. we will use AWS Lambda for Meet APP to create serverless functions.

## Feature 1: Filter Events By City

- Scenario1:

> When user hasn’t searched for a city, show upcoming events from all cities.
> Given user hasn’t searched for any city;
> When the user opens the app;
> Then the user should see the list of upcoming events.

- Scenario 2:

> User should see a list of suggestions when they search for a city.
> Given the main page is open;
> When user starts typing in the city textbox;
> Then the user should see a list of cities (suggestions) that match what they’ve typed.

- Scenario 3:

> User can select a city from the suggested list.
> Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
> When the user selects a city (e.g., “Berlin, Germany”) from the list;
> Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

## Feature 2: Show/Hide Event Details

> As a user,
> I should be able to show and hide event details.
> So that I can see the details of the events I chose and hide the details of events that I’m not interested in.

- Scenario1:

> When the user hasn’t picked any events to show details about that event, the user should see the list of all events.
> Given the user opens the app.
> When the user hasn’t selected to show/hide any event details.
> Then the user should see a list of upcoming events without complete information about that event.

- Scenario 2:

> When the user clicks on the show details button, they should see all the information about that event.
> Given the user can see the list of events on the main page.
> When the user clicks on a show details button.
> Then the user should see the details about that event.

- Scenario3:

> When the user is seeing the details of an event, they should be able to hide the event information with a hide button.
> Given the user is seeing the details of an event.
> When the user clicks on hide details.
> Then she should not see the details of that event anymore.

## Feature3: Specify Number of Events.

> As a User,
> I should be able to Specify Number of Events.
> So that I can set a limit of how many events should be shown at a time.

- Scenario 1:

> The user should see all the events when they don’t specify the number.
> Given the user is on event app.
> When the user hasn’t specified the number.
> Then the user should see all the events.

- Scenario 2:

> The user should see a limited number of events when they specify the number.
> Given the user can see all the events when opens the app.
> When the user uses the “specify number of events” feature in main page.
> Then the user should see only the number of events they specified in the “specify number of events” feature.

- Scenario 3:

> The user can select an event from the number of events they inquired.
> Given the user has specified the number of events.
> When the user selects an event from the specified number of events.
> Then the user should see the details of that event they selected.

## Feature4: Use the App When Offline.

> As a User,
> I should be able to use the app when offline.
> So that in case I don’t have access to the internet, I will still be able to check the events.

- Scenario 1:

> When the user opens the app without internet connection the app loads successfully.
> Given the user doesn’t have internet connection.
> When the user opens the app.
> Then the user should be able to see the app loads successfully, and they can access information.

- Scenario2:

> When the user starts filtering through the events, they should be able to find information while offline.
> Given the page has successfully loaded without internet.
> When the user searches for an event.
> Then the user should be able to see the result of their search.

- Scenario 3:

> The user can select to show or hide the details of an event when offline.
> Given the user can see the list of all events.
> When the user chooses to show or hide the event’s detail.
> Then the user should be able to see the details of the selected event.

## Feature 5: Add an App Shortcut to the Home Screen.

> As a User,
> I should be able to add an app shortcut to the home screen.
> So that I can quickly access the app.

- Scenario 1:

> When the user wants to use the app shortcut to navigate to home screen without going through steps.
> Given the app is open.
> When the user is browsing different features.
> Then the user should be able to see the app shortcut on the app and when clicking it should take the user to the home screen.

## Feature 6: Display Charts Visualizing Event Details.

> As a user,
> I should be able to display charts visualizing event details.
> So that I can get an overview of event dynamics and popularity.

- Scenario 1:

> When the user hasn’t clicked the chart section, they should be able to see the chart section link or button to navigate to.
> Given the user has the home screen open.
> When the user has not clicked on display charts for event visualization.
> Then the user should be able to see the display chart’s link or button to click on.

- Scenario 2:

> When the user uses the display chart feature, they can see charts visualizing the popularity of the event.
> Given the user has the home screen open.
> When the user navigates to the chart section.
> Then the user should be able to see charts that provide an overview of the popularity of that event.

## Technologies Used

- AWS (Amazon Web Services)
- Jest: For Unit Testing and Integration Testing
- Puppeteer: For End to End Testing
- Cucumber: For Acceptance Testing
- Recharts: For Data Visualization

## Getting Started

- Clone the repository: https://github.com/Sogolsa/meet.git
- Install dependencies: npm install
- Start the application: npm start

## Link To The App

https://sogolsa.github.io/meet/
