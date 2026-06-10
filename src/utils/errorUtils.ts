import winston from 'winston';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export function logError(message: string, error: Error): void {
  logger.error(message, { error: error.message });
}

export function handleError(error: Error): void {
  logError('An error occurred', error);
  // Log error to database
  prisma.errorLog.create({
    data: {
      message: error.message,
      stack: error.stack,
    },
  }).catch((err) => {
    logError('Failed to log error to database', err);
  });
}

export function handlePrismaError(error: any): void {
  if (error.code === 'P2002') {
    logError('Unique constraint error', error);
  } else if (error.code === 'P2025') {
    logError('Foreign key constraint error', error);
  } else {
    logError('Prisma error', error);
  }
}
