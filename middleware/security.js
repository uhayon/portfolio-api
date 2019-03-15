const helmet = require('helmet');

module.exports = {
  basic: helmet,
  securityPolicy: () => helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", `'${process.env.FRONT_END_DOMAIN}'`],
      styleSrc: ["'self'"]
    }
  })
};