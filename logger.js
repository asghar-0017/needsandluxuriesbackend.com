const pino = require("pino");
const pretty = require("pino-pretty");

// Configure the pretty stream
const stream = pretty({
  colorize: true, // colorize output
  levelFirst: false, // log level comes first
  translateTime: 'SYS:standard', // translate timestamp to readable format
});

// Create a logger instance with the pretty stream
const logger = pino(stream);

// Custom logger class for MongoDB operations
class MongoLogger {
  // Log query operations
  logQuery(query, parameters = {}) {
    logger.info({ query, parameters }, "MongoDB Query Executed");
  }

  // Log query errors
  logQueryError(error, query, parameters = {}) {
    logger.error({ error, query, parameters }, "MongoDB Query Error");
  }

  // Log slow queries
  logQuerySlow(time, query, parameters = {}) {
    logger.warn({ time, query, parameters }, "MongoDB Slow Query");
  }

  // Log migrations or schema-related messages (if applicable)
  logMigration(message) {
    logger.info({ message }, "Migration");
  }

  // General log method for different log levels
  log(level, message) {
    switch (level) {
      case "log":
        logger.info({ message });
        break;
      case "info":
        logger.info({ message });
        break;
      case "warn":
        logger.warn({ message });
        break;
      default:
        logger.error({ message });
        break;
    }
  }
}

module.exports = {
  MongoLogger,
  logger,
};
