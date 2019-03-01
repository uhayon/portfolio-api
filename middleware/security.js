const helmet = require('helmet');

module.exports = {
  basic: helmet,
  securityPolicy: () => helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"]
    }
  })
};