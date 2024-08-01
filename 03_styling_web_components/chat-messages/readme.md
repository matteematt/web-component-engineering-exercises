# Basic Exercise Template

A basic exercise template usable with modules 1 - 6.

## Instructions

* Download the starter kit.
* View the `index.html` page using a local web server.
    * If using VS Code, try out the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin.
* Work through the exercises using your favorite code editor.
* Have fun!

## Submission

If you wish to submit your exercise solution for review:

* Publish your exercise in a public GitHub repo.
* Email reviews@bluespire.com with the following information:
    * Your Name
    * Optional Twitter tag or other social media handles.
    * The module and exercise you are submitting.
    * A link to the GitHub repo where the exercise is located.
    * A statement indicating that you are ok with your code being video-reviewed and the review being shared with other students and/or on YouTube or other video platforms.

> Submitting an exercise does not guarantee that your solution will be reviewed. Only a small number of student exercises can be reviewed due to limited time and availability. If your submission is selected, you will be notified of the selection as well as when the review is posted.

## Requirements

- Build a <chat-message> component to display a single message.
- Use the <ui-avatar> component inside the message component to display the sender's avatar.
    - Use exportparts to expose parts of the avatar to consumers of the message component.
- Use Container Style Queries and CSS Custom Properties to enable the message to display in several variations:
    - A message from the current user vs. from a contact.
    - A normal vs. a compact message.
    - An important message.
- Build a <chat-thread> component that renders a sequence of messages.
    - Use Container Size Queries to direct the messages to layout in normal or compact mode.
    - Use CSS Custom Properties on messages to determine whether to display as from user, from contact, or important.

## Ouput

I didn't end up meeting every criteria but I have all of the main logic working. It just requires wiring through all of the css variables to make compact mode. I ended up having a large break between getting time on the course during this activity so I have decided to finish the main points and move on.
