const helmet = require('helmet');

module.exports = {
  basic: helmet,
  securityPolicy: () => helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", process.env.ORIGIN],
      styleSrc: ["'self'"]
    }
  })
};