import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import ConnectRedis from 'connect-redis';
import { createClient } from 'redis';
import * as Sentry from '@sentry/node';
import { logger } from './logger';
import { errorHandler } from '../middleware/errorHandler';
import { requestLogger } from '../middleware/requestLogger';
import { authRoutes } from '../routes/auth';
import { contentRoutes } from '../routes/content';
import { userRoutes } from '../routes/user';
import { adminRoutes } from '../routes/admin';
import { webhookRoutes } from '../routes/webhooks';
import { uploadRoutes } from '../routes/upload';
import { streamingRoutes } from '../routes/streaming';

class App {
  public app: Application;
  private redisClient: any;

  constructor() {
    this.app = express();
    this.initializeSentry();
    this.initializeRedis();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeSentry(): void {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      });

      // RequestHandler creates a separate execution context using domains
      this.app.use(Sentry.Handlers.requestHandler());
      // TracingHandler creates a trace for every incoming request
      this.app.use(Sentry.Handlers.tracingHandler());
    }
  }

  private async initializeRedis(): Promise<void> {
    try {
      this.redisClient = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      });

      await this.redisClient.connect();
      logger.info('Connected to Redis successfully');
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
    }
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          fontSrc: ["'self'"],
          connectSrc: ["'self'"],
        },
      },
    }));

    // CORS configuration
    this.app.use(cors({
      origin: (origin, callback) => {
        const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: process.env.CORS_CREDENTIALS === 'true',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
      message: {
        error: 'Too many requests from this IP, please try again later.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression
    this.app.use(compression());

    // Cookie parser
    this.app.use(cookieParser());

    // Session configuration
    if (this.redisClient) {
      const RedisStore = ConnectRedis(session);
      this.app.use(session({
        store: new RedisStore({ client: this.redisClient }),
        secret: process.env.SESSION_SECRET || 'your-session-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          domain: process.env.SESSION_DOMAIN,
        },
      }));
    }

    // Sanitize user input
    this.app.use(mongoSanitize());

    // Request logging
    this.app.use(requestLogger);

    // Health check endpoint
    this.app.get('/health', this.healthCheck.bind(this));
  }

  private initializeRoutes(): void {
    const apiVersion = process.env.API_VERSION || 'v1';
    const baseRoute = `/api/${apiVersion}`;

    // API routes
    this.app.use(`${baseRoute}/auth`, authRoutes);
    this.app.use(`${baseRoute}/content`, contentRoutes);
    this.app.use(`${baseRoute}/users`, userRoutes);
    this.app.use(`${baseRoute}/admin`, adminRoutes);
    this.app.use(`${baseRoute}/upload`, uploadRoutes);
    this.app.use(`${baseRoute}/streaming`, streamingRoutes);
    this.app.use(`${baseRoute}/webhooks`, webhookRoutes);

    // API documentation
    this.app.get(`${baseRoute}`, (req: Request, res: Response) => {
      res.json({
        message: 'Filmssy API',
        version: apiVersion,
        documentation: '/api/docs',
        endpoints: {
          auth: `${baseRoute}/auth`,
          content: `${baseRoute}/content`,
          users: `${baseRoute}/users`,
          admin: `${baseRoute}/admin`,
          upload: `${baseRoute}/upload`,
          streaming: `${baseRoute}/streaming`,
        },
      });
    });

    // 404 handler for API routes
    this.app.use('/api/*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        path: req.path,
      });
    });
  }

  private initializeErrorHandling(): void {
    // Sentry error handler (must be before other error handlers)
    if (process.env.SENTRY_DSN) {
      this.app.use(Sentry.Handlers.errorHandler());
    }

    // Custom error handler
    this.app.use(errorHandler);

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  }

  private async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
        services: {
          database: { status: 'ok', responseTime: 0 },
          redis: { status: 'ok', responseTime: 0 },
        },
      };

      // Check database health
      try {
        const startTime = Date.now();
        // Database health check would go here
        health.services.database.responseTime = Date.now() - startTime;
      } catch (error) {
        health.services.database.status = 'error';
      }

      // Check Redis health
      try {
        const startTime = Date.now();
        await this.redisClient.ping();
        health.services.redis.responseTime = Date.now() - startTime;
      } catch (error) {
        health.services.redis.status = 'error';
      }

      const status = Object.values(health.services).every(service => service.status === 'ok') ? 200 : 503;
      res.status(status).json(health);
    } catch (error) {
      res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      });
    }
  }

  public getApp(): Application {
    return this.app;
  }

  public async shutdown(): Promise<void> {
    try {
      if (this.redisClient) {
        await this.redisClient.quit();
      }
      logger.info('Application shutdown completed');
    } catch (error) {
      logger.error('Error during shutdown:', error);
    }
  }
}

export default App;