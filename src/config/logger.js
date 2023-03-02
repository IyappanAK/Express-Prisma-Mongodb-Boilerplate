const winston = require('winston');
const path = require('path');
const config = require('./config');

const tsFormat = () => new Date().toLocaleString();

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp({format: tsFormat}),
    winston.format.printf(({ level, message, timestamp }) => ` ${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: path.join(path.dirname(require.main.filename), 'service.log'),
      timestamp: tsFormat,
      maxFiles: 5,
      maxsize: 5242880, // 5 MB
      level: 'info',
    }),
    new winston.transports.File({
      filename: path.join(path.dirname(require.main.filename), 'error.log'),
      timestamp: tsFormat,
      maxFiles: 5,
      maxsize: 5242880, // 5 MB
      level: 'error',
    }),
  ],
});

module.exports = logger;
