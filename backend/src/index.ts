import dotenv from 'dotenv';
import { database } from './config/database';
import { logger } from './config/logger';
import App from './config/app';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

class Server {
  private app: App;
  private port: number;

  constructor() {
    this.port = parseInt(process.env.PORT || '5000', 10);
    this.app = new App();
  }

  public async start(): Promise<void> {
    try {
      // Connect to database
      await database.connect();

      // Start the server
      const server = this.app.getApp().listen(this.port, () => {
        logger.info(`🚀 Server is running on port ${this.port}`);
        logger.info(`📊 Environment: ${process.env.NODE_ENV}`);
        logger.info(`📅 Started at: ${new Date().toISOString()}`);
        logger.info(`🌐 API Base URL: http://localhost:${this.port}/api/v1`);
      });

      // Graceful shutdown
      const gracefulShutdown = async (signal: string) => {
        logger.info(`Received ${signal}. Starting graceful shutdown...`);

        server.close(async () => {
          logger.info('HTTP server closed');

          try {
            await database.disconnect();
            await this.app.shutdown();
            logger.info('Graceful shutdown completed');
            process.exit(0);
          } catch (error) {
            logger.error('Error during graceful shutdown:', error);
            process.exit(1);
          }
        });

        // Force shutdown after timeout
        setTimeout(() => {
          logger.error('Could not close connections in time, forcefully shutting down');
          process.exit(1);
        }, 10000); // 10 seconds
      };

      // Listen for shutdown signals
      process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
      process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new Server();
server.start().catch((error) => {
  logger.error('Failed to start application:', error);
  process.exit(1);
});

export default server;