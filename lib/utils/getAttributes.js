const _ = require('lodash');

module.exports = (object, attrs) => {
  if (_.isArray(attrs)) return _.pick(object, ...attrs);

  return _.isPlainObject(attrs) && _.isArray(attrs.exclude)
    ? _.omit(object, ...attrs.exclude) : object;
};
