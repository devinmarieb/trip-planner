# TripPlanner: Build Your Own Backend

![BYOB](http://g.recordit.co/avaxlIqDFr.gif)

####GitHub: [Repo](https://github.com/devinmarieb/trip-planner)

####Deployed: [Heroku App ](https://tripplannerprjct.herokuapp.com/)

###Completion

I have eighteen endpoints for TripPlanner:

9 `GET` requests

3 `POST` requests

3 `PATCH` requests

3 `DELETE` requests

I have 53 passing tests for TripPlanner. All endpoints have a test that checks for `status 200` and `status 404`. Where applicable, endpoints are tested for `status 422`.

### [Code I am proud of](https://github.com/devinmarieb/trip-planner/blob/master/server.js#L235-L254)

This is the code for deting a user. I am proud of this code because it was a slightly harder piece of logic to work out. It was the first delete request I wrote and I had to first search trips to make sure that trips associated with the users were deleted before the user was deleted.

### [Code I am not so proud of](https://github.com/devinmarieb/trip-planner/blob/master/server.js#L21-L40)

This is the code for checking if there is a request query. I wouldn't say I'm not proud of this code, but since I didn't know what requests queries were before this project, I'm not sure I went about checking for one the right way. I feel like there is probably a cleaner way to write this piece of code.

![Passing Tests](http://g.recordit.co/SvSnkOcsP9.gif)

### [Sad path test for getting a specific user](https://github.com/devinmarieb/trip-planner/blob/master/tests/server-test.js#L173-L191)

Instructor Feedback

Points: x / 150
