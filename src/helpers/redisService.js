"use strict";

const redis = require("redis");
const { promisify } = require("util");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

try {
  redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
  redisClient.clear = promisify(redisClient.del).bind(redisClient);
} catch (e) {
  console.log("redis error", e);
}

redisClient.on("connected", function () {
  console.log("Redis is connected");
});
redisClient.on("error", function (err) {
  console.log("Redis error.", err);
});

// setInterval(function () {
//     console.log("Keeping alive - Node.js Performance Test with Redis");
//     redisClient.set('ping', 'pong');
// }, 1000 * 60 * 4);

global.cache = redisClient;
module.exports = redisClient;
