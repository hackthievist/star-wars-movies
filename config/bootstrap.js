/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const Promise = require('bluebird');
const redis = require('async-redis');
const Chance = require('chance');

module.exports.bootstrap = function (cb) {
  sails.hooks.http.app.set('trust proxy', true);
  const chance = new Chance();
  const redisClient = redis.createClient(sails.config.redis);
  global._ = _;
  global.chance = chance;
  global.Promise = Promise;
  global.redisClient = redisClient;
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
