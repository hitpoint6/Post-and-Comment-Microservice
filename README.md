### Post and Comment Microservice

An app that allows to post posts, add comments to the posts, add moderation to the comments. The monolith version could be very simple to implment. This microservice version is more complicated with following services:

    - Post Service: creates a post
    - Comment Service: creates or updated a comment
    - Query Service: stores created and updated posts and comments for frontend query
    - Event Bus: receives events and send to all services. Implemented in express for education purpose
    - Moderation Service: updates the status of created event

Each service has its own persistent storage. It is stored in memory here for simplification.

Flow for comment moderation:

    - Comment Service creates a new comment with status pending moderation and sends to the bus
    - Query Service and Moderation Service receives the new comment. Query service serves to the frontend.
    - Moderation Service updates the status and sends to the bus. The comment service receives the event and sends back to the bus.
    - The Query Service receives the updated comment and serves to the frontend.

Stack:

    - Express
    - React
