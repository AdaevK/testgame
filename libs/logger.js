const winston = require('winston');

module.exports = ({ env }) => {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          ...(
            ['development', 'test'].includes(env)
              ? [winston.format.colorize(), winston.format.simple()]
              : [winston.format.timestamp(), winston.format.json()]
          ),
        ),
      }),
    ],
    exitOnError: false,
  });

  logger.stream = {
  // eslint-disable-next-line no-unused-vars
    write: (message, encoding) => {
      logger.info(message);
    },
  };

  return logger;
};
