// src/infrastructure/logging.ts
import 'dotenv/config';
import { createLogger, transports, format } from 'winston';
import uptrace from '@uptrace/node';
import { Application } from 'express';

const uptraceDSN = process.env.UPTRACE_DSN;

// 1. Configure Uptrace tracing
if (uptraceDSN) {
  uptrace.configureOpentelemetry({
    dsn: uptraceDSN,
    serviceName: 'budgetbuddy-api',
    serviceVersion: '1.0.0',
    resourceAttributes: {
      'deployment.environment': process.env.NODE_ENV || 'development',
    },
  });
} else {
  console.warn('⚠️ UPTRACE_DSN not set, tracing is disabled.');
}

// 2. Setup Winston logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ''
          }`;
        })
      ),
    }),
  ],
});

// 3. Optional: Express request logging middleware using Winston
export function setupLogging(app: Application) {
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    next();
  });
}

// 4. Export logger wrappers
export const logInfo = (message: string, meta?: object) => {
  logger.info(message, meta);
};

export const logError = (message: string, error?: Error, meta?: object) => {
  logger.error(message, { error: error?.message, ...meta });
};

export const logDebug = (message: string, meta?: object) => {
  logger.debug(message, meta);
};
