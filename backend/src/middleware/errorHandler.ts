import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { ApiResponse } from '@filmssy/common';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
}

class ErrorHandler {
  public static handle(
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    let code = error.code || 'INTERNAL_ERROR';

    // Log error details
    logger.error(`Error ${statusCode}: ${message}`, {
      error: error.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Handle specific error types
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation Error';
      code = 'VALIDATION_ERROR';
    } else if (error.name === 'UnauthorizedError' || error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Unauthorized';
      code = 'UNAUTHORIZED';
    } else if (error.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid ID format';
      code = 'INVALID_ID';
    } else if (error.name === 'MongoError' && error.code === 11000) {
      statusCode = 409;
      message = 'Duplicate entry';
      code = 'DUPLICATE_ENTRY';
    }

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
      message = 'Something went wrong';
    }

    const response: ApiResponse = {
      success: false,
      error: message,
      ...(code && { code }),
      timestamp: new Date().toISOString(),
      ...(req.headers['x-request-id'] && { requestId: req.headers['x-request-id'] as string }),
    };

    res.status(statusCode).json(response);
  }

  public static notFound(req: Request, res: Response): void {
    const response: ApiResponse = {
      success: false,
      error: 'Resource not found',
      timestamp: new Date().toISOString(),
    };

    res.status(404).json(response);
  }

  public static createError(
    message: string,
    statusCode: number = 500,
    code?: string
  ): AppError {
    const error = new Error(message) as AppError;
    error.statusCode = statusCode;
    error.code = code;
    error.isOperational = true;
    return error;
  }
}

export const errorHandler = ErrorHandler.handle;
export const notFoundHandler = ErrorHandler.notFound;
export const createError = ErrorHandler.createError;