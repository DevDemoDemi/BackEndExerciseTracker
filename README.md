# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)


1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
***************Breakdown*****************************
I can create a user through a form
use the route api/exercise/new-user
build an object with the form data (should include a name and id (id provided by db))

2. I can get an JSON of all users by getting api/exercise/users with the same info as when creating a user.
***************Breakdown*****************************
I can get a list of all the users
use the route api/exercise/users
return a Json with new route

3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object also with the exercise fields added.
***************Breakdown*****************************
I can create an exercise in a form (specific to each user) 
form includes description input,duration input and date input (if date is empty use default date: Date())
use the route api/exercise/add
return json with new route

4. I can retrieve a JSON with the full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
***************Breakdown*****************************
I can get a list of all the exercises (log)
the list should be attached to each user respectively
use the route api/exercise/log (with parameter of userId(_id))
return json with new route
exercise log needs to return as an array(mongoose should store data as an array by default)
need a number total for all exercises associated with each user respectively


5. I can retrieve a JSON with part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
***************Breakdown*****************************
I can get a list of exercises in a date range as a json.


Use the boilerplates to build this project from module 5
express-gomix and mongomongoose-gomix