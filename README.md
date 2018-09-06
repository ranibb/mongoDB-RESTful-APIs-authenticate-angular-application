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

### Connect the Registration UI with the Backend API

Use the Registration UI to register a user in mongoDB. Begin by generating a new service that is going to be responsible for making the http calls to the backend. Therefore, run the following command: `ng g s auth` where auth is the name we choose for the service. Within the service we create a method called registerUser that accepts a user object and returns the response that the backend api sends whenever it is available. In our case, the backend api responses with either an error or the registered user.

Now let's connect the service to the RegisterComponent by importing it and injecting it to the class constructor. And then in the registerUser method call the service passing the registerUserData that we want to register in mongoDB. Additional to calling the method, we need to subscribe to the observable that is returned. And when we subscribe to this observable, we either get the response or an error. For now, let's just log them to the console.

If you go now to the register page and try to submit, you will get an error in the console:

    Failed to load http://localhost:3000/api/register: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access.

This is a CORS (Cross-origin resource sharing) error, because the frontend is running on a different port compared to the backend. To fix this, we need to add CORS middleware in the server. Therefore, navigate to the server folder and install CORS by running the following command in the terminal: `npm install --save cors`. Next, open server.js and require CORS and use it. Then submit the form to register a user and check mongoDB for the new entry.

To summaries, what is happening is called the "Request-Response Cycle". Or I may call it the "one click story".

Begins with the frontend, in the RegisterComponent html, a button that calls the registerUser method from within the RegisterComponent class where the method is defined to call the AuthService passing in the registerUserData that were collected by the Two-Way binding on the input fields. The AuthService makes an http post request to the backend API URL passing in the registerUserData. In a good scenario, the backend registers that user in a mongoDB and returns the details of the registered user as a response that could be obtained from the returned observable that we subscribed to it when we called the AuthService. In a bad scenario, an error is returned instead that is also obtainable.

### Login UI & Login Service

Follow the same procedure we used for implementing the Registration UI and connecting it with the Backend API.