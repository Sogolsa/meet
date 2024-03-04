Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default
        Given the user opens the app
        When the user sees the list of events
        Then each event element should be collapsed by default

    Scenario: User can expand an event to see it's details
        Given the user sees the list of events
        When the user clicks on the show details button of that event
        Then that event should be expanded with its details

    Scenario: User can collapse an event to hide details
        Given the user can see the details of an event
        When the user clicks on hide details button
        Then the event element should collapse
