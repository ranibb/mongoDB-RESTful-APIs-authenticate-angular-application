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

### Events UI & Service

Begin by generating a new service for the events and we call it event: `ng g s event`. Then create a service to fetch the regular and special events and subscribe to the observables in the respective components. Then build up the html for both regular and special events components.

## Authentication

Only authenticated users should be able to navigate to the special events view. For our application, an authenticated user is one whose information is stored in the database. So, there are two scenarios: First, is when a user registers. In this case the user's information is stored in the database. Second, is when the user logs in. A user logging in implies that the user entered valid credentials matching the information in the database. So, the user can be authenticated.

But what exactly does it mean to authenticate a user when they register or login? For our application we are going to be implementing a Token-Based authentication:

In the frontend when we register or login, we submit the user details to the server. The API suggest the details of the user from the database along with the auto generated object id. At this point the server generates a Token which is nothing but encrypted information that identifies the user and sends the Token as a response to the frontend. Once the response is received, the angular application stores the Token in the browser's local storage. 

Now for every subsequent request, for example a request to either regular or special events, the frontend application sends the stored Token as part of the request. The server checks if the Token is present and then decrypts the Token to check for its validity. If it's a valid token the serve confirms that the request is from a user whose details it has already. In other words, the request is from an authenticated user. 

Once the server confirms the validity, it sends the array of events as a response to the browser. If the token is not valid or if the token is not present at all as part of the request, it simply means that the request is not from an authenticated user and the server will respond with a status 401. Based on what the response is we can either display the events in the UI or redirect the user to the login view.

### JSON Web Tokens (JWT)

Let’s understand what exactly is a Token and how we will be generating and verifying Tokens in our application. The Token we will be using contains JSON data and is called a JSON Web Tokens (JWT).

A JSON Web Token or JWT is a JSON object that is defined as a safe way to represent a set of information between two parties. The Token is composed of a header, a payload and a signature. So, a JWT is just a string with the following format: `header.payload.signature - xxxxx.yyyyy.zzzzz`:

* The header typically consists of two parts, the type of the Token which is JWT and the hashing algorithm being used.
* The payload component of the JWT is the data that is stored inside the JSON Web Token. In our example, the server creates a JWT with the user ID stored inside the payload.
* The signature is used to verify the Token.

You can go to [jwt.io](https://jwt.io) for more information on the format. For us though, what really matters is how a JWT is generated and verified. For that we use the jsonwebtoken npm package. To generate a new Token, we use the sign method passing the payload and a secret key and any options if required.

    jwt.sign(payload, secretOrPrivateKey, [options, callback])

The Token is then sent as a response to the frontend and the same Token is sent back to the server with every subsequent request. And to verify the Token sent back from the frontend we use the verify method passing in the Token itself along with the same secret key that was used to sign and any options again if required.

    jwt.verify(token, secretOrPrivateKey, [options, callback])

### Generating JWT in the back-end when a user registers or logs in.

Navigate to the server folder and run this command `npm install jsonwebtoken --save` in the terminal. Then require the package in the api.js file and generating JWT in both the register & login APIs.

#### Generating JWT in the register API

After saving the user successfully, what we have to do first is create the payload. The payload is an object and will contain the registered user id. So, There for define a new variable payload and asign an object to it. By convention the key is called subject, and then the value will be the registered user object id.

```JavaScript
let payload = { subject: registeredUser._id } 
```

Now that we have the payload, lets assign a token and generate it. The first argument is the payload and the second argument is a secret key which it can be anything.

```JavaScript
let token = jwt.sign(payload, 'mySecretKey')
```

So now we have the JWT stored in the variable token. The last step is to send this token as an object instead of the registeredUser.

```JavaScript
res.status(200).send({token})
```

Alright, the register API now responses with a token instead of the registeredUser.

#### Generating JWT in the login API

Follow the same procedure and generating JWT for the login API.

### Storing JWT in the front-end

Storing the token in the browser is simple and we will be making use of local storage.

### Special Events Route Guard

Ensuring only authenticated users are able to view the special events. For that, let's add a route guard to the special events route.

A route guard is nothing but a piece of code that controls navigation to and from components. It can return true in which case the normal execution continues or return false in which case the navigation is stopped. For our scenario, if a token is present in the browser, it means that the server has sent a token to the frontend which can only happen if the user registers or logs in.

Generate the guard in the terminal by running the following command: `ng g guard auth` where auth is the name of the guard.

And then create a method in the auth service that returns if a token exists in the local storage or not. Then implement a client-side route guard.

### Creating a Token Interceptor

Now we are going to verify the token in the backend to make sure it is valid. We do that by sending the stored token back to the server for verification. And the way to achieve that is angular http interceptor.

The http interceptor basically intercepts outgoing https requests, transforms them and then sends it to the server. The interceptor we will be implementing will modify the request to contain the token that is stored in the browser's local storage.

The first thing to do is to generate the service using angular CLI. Run the command `ng g s token-interceptor` in the terminal. Once it is generated open the token-interceptor.service.ts and import the HttpInterceptor.

Next let the TokenInterceptorService class implements the HttpInterceptor interface. Now by asking the class to implement the interface we have to define an intercept method which takes two arguments; request and next to pass on the execution. Within the method, first let’s make a clone of the request. And to the cloned request lets add to the header the authorization information.

The key is Authorization and the value it the token but, in a convention known as the Bearer token. The format is the word Bearer followed by a space followed by the actual token value. For now, let’s hard-code a json web token with a valid format 'xx.yy.zz'. And then we pass on the execution by returning next.handle and passing in the tokenizedReq. This should be sufficient to test if the interception is working. So, let's register this interceptor service in the app module.

Next lets send the actual token instead of the hard-coded token value 'Bearer xx.yy.zz'. For that. create a new method in the AuthService that fetches the token value. Then we can use this method in the TokenInterceptorService.

### Middleware to verify Token in the backend.

A middleware is nothing but a function that gets executed before the user defined handler is executed. So, let's create a verify token middleware in the backend.

Now we have Completed the authentication. We have an AuthGuard to check for the token in the frontend. And we have a verifyToken middleware in the backed to check if a token is valid or not.

For testing purpose, try to create an invalid token in the local storage manually by using the chrome's developer console. There, type the following code:

    localStorage.setItem('token', 'anything')

You should get a jwt malformed exception with a 500 status.

Exercise: Handle this exception.

### To do (Improvements and new functionalities):
* Encrypt the password: Make sure you don't store the password as plain text in the db. Encrypt it and Decrypt it.
* Do not return the password: Whenever you return user details, make sure you don't return the password field. It definitely not necessary for the frontend.
* Improve registration: Check if the e-mail already exists in the db and return an appropriate response
* Add error handling: Mostly we just logged to the console what the error is. Instead add a catch error block. Throw it to the component and display an appropriate error message in the view so that the user understands what is going wrong.
* Create a new event: Add a new view where registered users can create a new event and submit it. Let the event be stored in the db instead of being hard-coded.
* Events created by a specific user: Add a view which displays all the events created by that specific user. Note: We were adding the user id as the payload to the JSON Web Token. This is where it comes to use create an API that fetches all the events created by the logged in user ID.