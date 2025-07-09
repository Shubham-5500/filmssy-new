import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Generate request ID
  const requestId = uuidv4();
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);

  const startTime = Date.now();
  const { method, url, ip } = req;
  const userAgent = req.get('User-Agent') || 'Unknown';

  // Log request start
  logger.http(`Incoming ${method} ${url}`, {
    requestId,
    method,
    url,
    ip,
    userAgent,
    body: method !== 'GET' ? req.body : undefined,
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(body: any) {
    const duration = Date.now() - startTime;
    
    logger.http(`Response ${method} ${url} - ${res.statusCode}`, {
      requestId,
      method,
      url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: JSON.stringify(body).length,
    });

    return originalJson.call(this, body);
  };

  // Override res.send to log response
  const originalSend = res.send;
  res.send = function(body: any) {
    const duration = Date.now() - startTime;
    
    logger.http(`Response ${method} ${url} - ${res.statusCode}`, {
      requestId,
      method,
      url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: typeof body === 'string' ? body.length : JSON.stringify(body).length,
    });

    return originalSend.call(this, body);
  };

  next();
};