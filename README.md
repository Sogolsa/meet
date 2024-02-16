Feature 2: Show/Hide Event Details
As a user,
I should be able to show and hide event details.
So that I can see the details of the events I chose and hide the details of events that I’m not interested in.

Scenario1:
When the user hasn’t picked any events to show details about that event, the user should see the list of all events.
Given the user opens the app.
When the user hasn’t selected to show/hide any event details.
Then the user should see a list of upcoming events without complete information about that event.

Scenario 2:
When the user clicks on the show details button, they should see all the information about that event.
Given the user can see the list of events on the main page.
When the user clicks on a show details button.
Then the user should see the details about that event.

Scenario3:
When the user is seeing the details of an event, they should be able to hide the event information with a hide button.
Given the user is seeing the details of an event.
When the user clicks on hide details.
Then she should not see the details of that event anymore.

Feature3: Specify Number of Events.
As a User, 
I should be able to Specify Number of Events.
So that I can set a limit of how many events should be shown at a time.


Scenario 1:
The user should see all the events when they don’t specify the number.
Given the user is on event app.
When the user hasn’t specified the number.
Then the user should see all the events.

Scenario 2:
The user should see a limited number of events when they specify the number.
Given the user can see all the events when opens the app.
When the user uses the “specify number of events” feature in main page.
Then the user should see only the number of events they specified in the “specify number of events” feature.

Scenario 3:
The user can select an event from the number of events they inquired. 
Given the user has specified the number of events.
When the user selects an event from the specified number of events.
Then the user should see the details of that event they selected.

Feature4:  Use the App When Offline.
As a User,
I should be able to use the app when offline.
So that in case I don’t have access to the internet, I will still be able to check the events.

Scenario 1:
When the user opens the app without internet connection the app loads successfully.
Given the user doesn’t have internet connection.
When the user opens the app.
Then the user should be able to see the app loads successfully, and they can access information.

Scenario2:
When the user starts filtering through the events, they should be able to find information while offline.
Given the page has successfully loaded without internet.
When the user searches for an event.
Then the user should be able to see the result of their search.

Scenario 3:
The user can select to show or hide the details of an event when offline.
Given the user can see the list of all events.
When the user chooses to show or hide the event’s detail.
Then the user should be able to see the details of the selected event.

Feature 5:  Add an App Shortcut to the Home Screen.
As a User,
I should be able to add an app shortcut to the home screen.
So that I can quickly access the app.

Scenario 1:
When the user wants to use the app shortcut to navigate to home screen without going through steps.
Given the app is open.
When the user is browsing different features.
Then the user should be able to see the app shortcut on the app and when clicking it should take the user to the home screen.



 App Feature6:  Display Charts Visualizing Event Details.
As a user,
I should be able to display charts visualizing event details.
So that I can get an overview of event dynamics and popularity.

Scenario 1:
When the user hasn’t clicked the chart section, they should be able to see the chart section link or button to navigate to.
Given the user has the home screen open.
When the user has not clicked on display charts for event visualization.
Then the user should be able to see the display chart’s link or button to click on.


Scenario 2:
When the user uses the display chart feature, they can see charts visualizing the popularity of the event.
Given the user has the home screen open.
When the user navigates to the chart section.
Then the user should be able to see charts that provide an overview of the popularity of that event.