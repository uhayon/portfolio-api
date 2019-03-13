const slowDown = require('express-slow-down');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  max: 10
});

const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 1,
  delayMs: 500
});

module.exports = {
  rateLimiter,
  speedLimiter
};

