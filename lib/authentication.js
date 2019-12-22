const _ = require('lodash');
const authentication = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');

const getConfiguration = require('./configuration');
const configureHooks = require('./authentication.hooks');
const configureSubscribers = require('./authentication.subscribers');

module.exports = _.curry((config, app) => {
  const { authConfig, ...configuration } = getConfiguration(config);
  if (!app) {
    throw new Error('No application to configure authentication for.');
  } else if (!authConfig.secret) {
    throw new Error('Please specify the authentication secret');
  }

  app.set('authPluginConfig', configuration);
  app.configure(authentication(authConfig));
  app.configure(local());

  const authenticationService = app.service(authConfig.path.replace(/^\//, ''));

  configureHooks(authenticationService, configuration);
  configureSubscribers(authenticationService, configuration.subscribers);
});
