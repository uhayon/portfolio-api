const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

/**** WINSTON *****/
const { combine, printf, json } = format;
const path = require('path');

const myFormat = printf(info => `${info.timestamp} [${info.level}] - ${info.message}`);
const appendTimestamp = format((info) => {
  info.timestamp = new Date().toISOString();

  return info;
});

const [winstonLogName, _] = new Date().toISOString().split('T');

const logger = createLogger({
  format: combine(
    json(),
    appendTimestamp(),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs', `${winstonLogName}.log`),
      options: { flags: 'a' }
    })
  ]
});
/******************/

module.exports = {
  logger,
  morgan: () => morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms')
}