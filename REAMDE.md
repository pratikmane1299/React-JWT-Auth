# React JWT Auth

Authentication and Authorization in jsonwebtokens.

## Server

* [X] - Initialize Node Project.
* [X] - Install Dependencies.
  * [X] - Express, morgan, cors, nodemon, jsonwebtokens, bcryptjs, yup, mongoose.
* [X] - Create Express Server.
* [X] - Add Auth Routes.
* [ ] - Create User model.
* [ ] - SignUp User @POST /api/signup
  * [ ] - Validate request body.
  * [ ] - Check if user already exist.
  * [ ] - Hash password
  * [ ] - Save User in database.
* [ ] - login User @POST /api/login
  * [ ] - Validate request body.
  * [ ] - Check if user already exist.
  * [ ] - Hash  & check if password match.
  * [ ] - Send jsonwebtoken.
* [ ] - Create Auth Middleware.
* [ ] - Add a private route.
* [ ] - Apply auth middleware against private route.

Client

* [ ] - Create a react app.
* [ ] - Install Dependencies.
  * [ ] - react-router-dom, bootstrap, yup.
* [ ] - Add login/signUp, protected Routes.
* [ ] - Create signup form.
* [ ] - Add validation to signup form.
* [ ] - Make POST request to @/api/signup
  * [ ] - If errors show errors on page.
  * [ ] - Else save token navigate to login page.
* [ ] - Create login form.
* [ ] - Add validation to login form.
* [ ] - Make POST request to @/api/login
  * [ ] - If errors show errors to user.
  * [ ] - Else save token navigate dashboard page.
* [ ] - Create User context.
  * [ ] - Wrap app with context provider.
  * [ ] - Add user state and methods to store and remove jwt token, to context.
* [ ] - Create private route component.
* [ ] - Make dashboard a private route.
* [ ] - Get token from context and show user details in dashboard.
* [ ] - Add logout.
  * [ ] - Remove token from localstorage.
