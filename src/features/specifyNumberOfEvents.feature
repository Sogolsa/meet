Feature: Specify Number of Events

    Scenario: The user should see 32 events when they haven't specify the number.
        Given the user is on event app
        When the user has not specified the number
        Then the user should see 32 events by default

    Scenario: The user can change the number of events displayed by specifying the number.
        Given the user can see all the events when opens the app
        When the user specifies the number of events to be displayed
        Then the user should see only the number of events they specified
