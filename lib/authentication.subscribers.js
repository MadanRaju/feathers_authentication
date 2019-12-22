const _ = require('lodash');

const VALID_EVENTS = ['login', 'logout'];

module.exports = (service, subscribers) => {
  if (_.isEmpty(subscribers)) {
    _.forOwn(_.pick(subscribers, ...VALID_EVENTS), (subscriber, event) => {
      service.on(event, subscriber);
    });
  }
};
