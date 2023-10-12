### Post and Comment Microservice

This is the microservice version of what would be a very simple post posts and comments app if built in a monolith way.

## Services:

    - Post Service: Create a post
    - Comment Service: Create or update a comment for a post
    - Query Service: Read all the posts and their comments
    - Moderation Service: Update the status of a comment: pending, rejected, approved

Each service has its own persistent storage in memory for simplification.

Event Bus receives events and send to all services, each service can then choose their intersted events to process. The Event Bus is implemented in express for learning purpose.

`npm start` to start services.

## Flow for comment moderation:

    - Comment Service creates a new comment with status pending moderation and sends to the Event Bus
    - Query Service receives the comment and serves to fontend as pending moderation.
    - Moderation Service updates the status according to a critieria like: Does the comment contains the word "orange". Then it sends the CommentModerated Event to the event bus. The comment service receives the event, update the comment status, then sends CommentUpdated event back to the bus.
    - The Query Service receives the CommentUpdated event, updates its data and serves to the frontend.

## Stack:

    - Express
    - React
