/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createLogger, format, transports } from 'winston';

/**
 * Logger Configuration
 */
export const Logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
  ),
  transports: [
    // Log to console
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorized logs for the console
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
      ),
    }),

    // Log to a file
    new transports.File({
      filename: 'logs/application.log',
      format: format.combine(
        format.json(), // JSON format for file logs
      ),
      maxsize: 5 * 1024 * 1024, // 5MB per log file
      maxFiles: 3, // Keep up to 3 log files
    }),
  ],
});

/**
 * Logger Helper for Standard Logging
 */
export const logInfo = (message: string): void => {
  Logger.info(message);
};

export const logError = (message: string, error?: Error): void => {
  Logger.error(`${message}${error ? `: ${error.message}` : ''}`);
};

export const logWarn = (message: string): void => {
  Logger.warn(message);
};

export const logDebug = (message: string): void => {
  Logger.debug(message);
};
