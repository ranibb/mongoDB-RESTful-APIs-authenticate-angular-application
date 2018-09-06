# EventHub (Angular App – Authentication)
It is an application that lists the events. The choice of STACK is the MEAN stack:
* MongoDB – Storing data
* Express – REST APIs
Creating a basic express server. APIs for user registration, user logging, fetching regular and special events. We will test these APIs using Postman.
* Angular – Frontend framework (Version 6)
* Node – Execution environment

## Creating the Express Server

Initializing a npm project: `npm init`.

install express web server and body-parser; the middle ware to handle form data such as user registration or login: `npm install express body-parser --save`.

It is a good practice to have a separate route for all the API requests. So, define all the API end-points in this path: routes/api.js

## Create a mongo database

Next, create a mongo database that you can use to store and retrieve user information. Instead of creating the database locally, make use of the [mLab](https://mlab.com/) which provides database as a service.

### Setup the API endpoints for the App

Whenever a user makes a request to the server, the server needs to interact with mongodb to perform the required operations. For this interaction, we make use of [mongoose](https://mongoosejs.com/). mongoose is a npm package that provides mongodb object mapping. Or in simple words, mongoose translates the data in the database to a JavaScript object for use in our application. To install mongoose package, execute the command: `npm install mongoose --save` in the terminal.

As mentioned, mongoose translates the data in the database to a JavaScript object. So, we need to have a blue print or a schema of that object. Therefore, create a model "user.js" and place it in model’s folder.

### Create the registration API and test it with POSTMAN

Create an API to register a new user on mongoDB. The overview: You fill up the email and password in the frontend and submit the form. Then, the user data is sent to the API endpoint that internally save the user into mangoDB using mongoose.

### Create the login API and test it with POSTMAN


### Create the Events API

We are going to create the APIs to fetch regular and special events. Instead on interacting with mongoDB to fetch the events, we are going to hard-code an array of events in the api method itself, as we are only focusing on authenticating angular applications at the moment.

## Angular App

Generating a new angular application with routing using angular cli: `ng new ngApp --routing`. 

Generating 4 components: register, login, events and special-events using the comand: `ng g c name-of-the-component`.

Setup the routes and use bootstrap to build up the initial html markup.

### Registration UI

build up the RegisterComponent html template and add a click handler that calls an event registerUser when the Register button is clicked.

We need to retrieve the value from the input fields email and password and send it to the backend. Therefore, create a property in the RegisterComponent class and name it registerUserData and assign it to an empty object to it. Then we are going to bind the inputs field to this registerUserData property. So registerUserData is the object that contains the email and password values of the user about to be registered.

For now, let's log to the browser's console on the click of the register button. For that, bind an event to the register button on click to call a method that we define in the RegisterComponent class to retrieve the registerUserData object.