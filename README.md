# React JWT Auth

Authentication and Authorization in jsonwebtokens.

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
  * [X] - Else save token navigate to login page.
* [X] - Create login form.
* [X] - Add validation to login form.
* [X] - Make POST request to @/api/login
  * [X] - If errors show errors to user.
  * [X] - Else save token navigate dashboard page.
* [ ] - Create User context.
  * [ ] - Wrap app with context provider.
  * [ ] - Add user state and methods to store and remove jwt token, to context.
* [ ] - Create private route component.
* [ ] - Make dashboard a private route.
* [ ] - Get token from context and show user details in dashboard.
* [ ] - Add logout.
  * [ ] - Remove token from localstorage.
