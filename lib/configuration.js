const { defaultsDeep } = require('lodash');

const DEFAULT_CONFIGURATION = {
  path: '/authentication',
  header: 'Authorization',
  service: 'users',
  passReqToCallback: true,
  jwt: {
    header: { typ: 'access' },
    algorithm: 'HS256',
    expiresIn: '1d',
  },
  userAttributes: {
    payload: ['id', 'username'],
    response: { exclude: ['password', 'passwordHash'] },
  },
  local: {
    usernameField: 'username',
    passwordField: 'password',
  },
  headerScheme: 'Bearer',
};

module.exports = (configs) => {
  const {
    userAttributes, hooks, subscribers, ...authConfig
  } = defaultsDeep(configs, DEFAULT_CONFIGURATION);
  return {
    authConfig, userAttributes, hooks, subscribers,
  };
};
