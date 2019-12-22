const _ = require('lodash');
const { BadRequest, NotAuthenticated } = require('@feathersjs/errors');

const { getAttributes } = require('../utils');

const extractToken = (context) => {
  const { header, headerScheme } = context.app.get('authentication');
  const authHeader = context.params.headers[header.toLowerCase()];
  if (!authHeader) {
    throw new BadRequest('No token present in Authorization header');
  }
  const tokenRegex = new RegExp(`^${_.trim(headerScheme)}\\s+(\\S+)$`, 'i');
  const matches = authHeader.match(tokenRegex);
  if (_.isEmpty(matches)) {
    throw new NotAuthenticated('Malformed Bearer JWT Token');
  }
  return matches[1];
};

module.exports = (context, __, options) => {
  if (context.params.provider !== 'rest') return context;
  const { jwt, secret } = context.app.get('authentication');
  const settings = _.defaults(options, { jwt, message: 'Not Authenticated', secret });

  return context.app.passport.verifyJWT(extractToken(context), settings).then((payload) => {
    const { userAttributes: { payload: userAttributes } } = context.app.get('authPluginConfig');
    Object.assign(context.params, {
      payload, user: payload.user || getAttributes(payload, userAttributes),
    });
  }).catch((error) => {
    throw new NotAuthenticated(settings.message, error);
  });
};
