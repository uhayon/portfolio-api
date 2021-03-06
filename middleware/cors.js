const cors = require('cors');

const getCorsConfiguration = () => {
  if (process.env.NODE_ENV !== 'production') {
    return cors();
  }

  return cors({
    origin: (origin, callback) => {
      // Allow all requets temporarily
      // callback(null, true);
      
      if (origin === process.env.FRONT_END_DOMAIN) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  });
}

module.exports = getCorsConfiguration;