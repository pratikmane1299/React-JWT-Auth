# React JWT Auth

Authentication and Authorization in jsonwebtokens.

## Requirements
  - [**Docker**](https://www.docker.com/get-started)

## Getting Started

### 1. Clone the repo
```sh
  git clone https://github.com/pratikmane1299/React-JWT-Auth.git
```

### 2. Install Dependencies
```sh
  $ cd client
  npm install

  cd server
  npm install
```

### 3. Running the application with docker
```sh
  docker-compose up
```

## Server

* [X] - Initialize Node Project.
* [X] - Install Dependencies.
  * [X] - Express, morgan, cors, nodemon, jsonwebtokens, bcryptjs, yup, mongoose.
* [X] - Create Express Server.
* [X] - Add Auth Routes.
* [X] - Create User model.
* [X] - SignUp User @POST /api/signup
  * [X] - Validate request body.
  * [X] - Check if user already exist.
  * [X] - Hash password
  * [X] - Save User in database.
* [X] - login User @POST /api/login
  * [X] - Validate request body.
  * [X] - Check if user already exist.
  * [X] - Hash  & check if password match.
  * [X] - Send jsonwebtoken.
* [X] - Create Auth Middleware.
* [X] - Add a private route.
* [X] - Apply auth middleware against private route.

## Client

* [X] - Create a react app.
* [X] - Install Dependencies.
  * [X] - react-router-dom, bootstrap, yup.
* [X] - Add login/signUp, protected Routes.
* [X] - Create signup form.
* [X] - Add validation to signup form.
* [X] - Make POST request to @/api/signup
  * [X] - If errors show errors on page.
  * [X] - Navigate to login page.
* [X] - Create login form.
* [X] - Add validation to login form.
* [X] - Make POST request to @/api/login
  * [X] - If errors show errors to user.
  * [X] - Navigate to dashboard page.
* [X] - Create User context.
  * [X] - Wrap app with context provider.
  * [X] - Add user state and methods to store and remove jwt token, to context.
* [X] - Create private route component.
* [X] - Make dashboard a private route.
* [X] - Get token from context and show user details in dashboard.
* [X] - Add logout.
  * [X] - Remove token from localstorage.
