const _ = require('lodash');
const { hooks: { authenticate } } = require('@feathersjs/authentication');

const { getAttributes } = require('./utils');

const setPayload = _.curry((payloadAttributes, context) => {
  context.params.payload = context.params.payload || {};
  Object.assign(context.params.payload, getAttributes(context.params.user, payloadAttributes));
});

const addUserInfo = _.curry((userAttributes, context) => {
  context.result.user = getAttributes(context.params.user, userAttributes);
});

const getHooks = (allHooks, type, defaults = []) => {
  const hooks = defaults;
  if (allHooks && _.isArray(allHooks[type])) {
    hooks.push(...allHooks[type]);
  }
  return hooks;
};

module.exports = (service, configuration) => {
  service.hooks({
    before: {
      create: getHooks(configuration.hooks, 'before', [authenticate('local'), setPayload(configuration.userAttributes.payload)]),
    },
    after: {
      create: getHooks(configuration.hooks, 'after', [addUserInfo(configuration.userAttributes.response)]),
    },
    error: {
      all: getHooks(configuration.hooks, 'error'),
    },
  });
};
