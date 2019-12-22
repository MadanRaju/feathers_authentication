# Authentication
---

A simple feathers-authentication wrapper to perform form based authentication.

### Local Authentication
---
* Setting up local authentication is as easy as configuring your feathers app with one extension.
  ```
  $ yarn add git+ssh://github.com/MadanRaju/feathers_authentication.git
  ```

* Then in your feathers app's `app.js` just import the `feathers-auth` module and call it with an authentication secret to encrypt JWTs with.
  ```
  ...
  const feathersAuth = require('feathers-auth');
  ...
  app.configure(feathersAuth({secret: 'SOME_VERY_LONG_RANDOM_SECRET'}));
  ```
##### Configuration
*feathers-auth* allows following configuration options during initialization:
```
{
  path: '/authentication', // default, the authentication service path
  header: 'Authorization', // default, the header to use when using JWT auth
  entity: 'user', // default, the entity that will be added to the request, socket, and context.params. (ie. req.user, socket.user, context.params.user)
  service: 'users', // default, the service to look up the entity
  passReqToCallback: true, // default, whether the request object should be passed to the strategies `verify` function
  session: false, // not required, whether to use sessions
  secret: , //required, authentication secret to use for encrypting and decrypting jwt.
  cookie: { // not required
    enabled: false, // whether cookie creation is enabled
    name: 'feathers-jwt', // the cookie name
    httpOnly: false, // when enabled, prevents the client from reading the cookie.
    secure: true // whether cookies should only be available over HTTPS
  },
  jwt: { // default
    header: { typ: 'access' }, // by default is an access token but can be any type. This is not a typo!
    audience: 'https://yourdomain.com', // not required, The resource server where the token is processed
    subject: 'anonymous', // not required, Typically the entity id associated with the JWT
    issuer: 'feathers', // not required, The issuing server, application or resource
    algorithm: 'HS256', // default, the algorithm to use
    expiresIn: '1d' // default, the access token expiry
  }
  local: {
    usernameField: 'username', // default, username field in the request body
    passwordField: 'password', // default, password field in the request body
    entityUsernameField: 'usernameFieldInEntityOrDatabase', // not required, entity username field to use if not same as the username field in the request
    entityPasswordField: 'passwordFieldInEntityOrDatabase' // not required, entity password field to use if not same as the password field in the request
  },
  userAttributes: { 
    payload: ['id', 'username'], // default, user fields to include in payload. Look fields section to know more.
    response: { exclude: ['password', 'passwordHash'] }, // default, user fields to include in the response.user object.
  },
  hooks: { // not required
    before: [], // hooks to run custom logic before the jwt is generated
    after: [], // hooks to manipulate the response.
    error: [], // hooks to run when there is an error raised by authentication service.
  },
  subscribers: { // not required
    login: loginCallbackFunction, // callback function to run after a successfull login.
    logout: logoutCallbackFunction, // callback function to run after a successfull logout.
  }
}
```
LEGEND
```
not required: the field is not required and has no default value set.
required: the field is required and application would fail without it.
deafult: the value specified in example json is the default value for the field.
```