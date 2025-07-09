// App configuration constants
export const APP_CONFIG = {
  NAME: 'Filmssy',
  VERSION: '1.0.0',
  DESCRIPTION: 'Premium Streaming Platform',
  SUPPORT_EMAIL: 'support@filmssy.com',
  CONTACT_EMAIL: 'contact@filmssy.com',
  COMPANY_NAME: 'Filmssy Inc.',
  COPYRIGHT_YEAR: new Date().getFullYear(),
  SOCIAL_LINKS: {
    TWITTER: 'https://twitter.com/filmssy',
    FACEBOOK: 'https://facebook.com/filmssy',
    INSTAGRAM: 'https://instagram.com/filmssy',
    YOUTUBE: 'https://youtube.com/filmssy',
    LINKEDIN: 'https://linkedin.com/company/filmssy',
  },
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Will be configured at runtime
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      CHANGE_PASSWORD: '/auth/change-password',
      PROFILE: '/auth/profile',
    },
    CONTENT: {
      MOVIES: '/content/movies',
      TV_SHOWS: '/content/tv-shows',
      SEARCH: '/content/search',
      TRENDING: '/content/trending',
      FEATURED: '/content/featured',
      GENRES: '/content/genres',
      COLLECTIONS: '/content/collections',
      RECOMMENDATIONS: '/content/recommendations',
    },
    USER: {
      PROFILE: '/user/profile',
      PREFERENCES: '/user/preferences',
      WATCHLIST: '/user/watchlist',
      HISTORY: '/user/history',
      RATINGS: '/user/ratings',
      SUBSCRIPTIONS: '/user/subscriptions',
    },
    SUBSCRIPTION: {
      PLANS: '/subscriptions/plans',
      CREATE: '/subscriptions/create',
      CANCEL: '/subscriptions/cancel',
      UPDATE: '/subscriptions/update-payment',
      INVOICE: '/subscriptions/invoices',
      COUPONS: '/subscriptions/coupons',
    },
    ADMIN: {
      USERS: '/admin/users',
      CONTENT: '/admin/content',
      ANALYTICS: '/admin/analytics',
      SYSTEM: '/admin/system',
      LOGS: '/admin/logs',
    },
  },
} as const;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// Content constants
export const CONTENT_CONSTANTS = {
  VIDEO_QUALITIES: ['480p', '720p', '1080p', '2160p'] as const,
  VIDEO_FORMATS: ['hls', 'dash', 'mp4'] as const,
  SUBTITLE_FORMATS: ['vtt', 'srt', 'ass'] as const,
  IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'] as const,
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 2000,
  MAX_SYNOPSIS_LENGTH: 500,
  MIN_DURATION: 1, // 1 minute
  MAX_DURATION: 600, // 10 hours in minutes
  MAX_FILE_SIZE: 10 * 1024 * 1024 * 1024, // 10GB in bytes
  THUMBNAIL_SIZES: {
    SMALL: { width: 300, height: 450 },
    MEDIUM: { width: 500, height: 750 },
    LARGE: { width: 800, height: 1200 },
  },
  BACKDROP_SIZES: {
    SMALL: { width: 780, height: 439 },
    MEDIUM: { width: 1280, height: 720 },
    LARGE: { width: 1920, height: 1080 },
  },
} as const;

// User constants
export const USER_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_LOGIN_ATTEMPTS: 5,
  ACCOUNT_LOCK_TIME: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  TOKEN_EXPIRY: {
    ACCESS: 15 * 60, // 15 minutes in seconds
    REFRESH: 7 * 24 * 60 * 60, // 7 days in seconds
    RESET: 1 * 60 * 60, // 1 hour in seconds
    VERIFICATION: 24 * 60 * 60, // 24 hours in seconds
  },
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
  MAX_SESSIONS_PER_USER: 5,
} as const;

// Subscription constants
export const SUBSCRIPTION_CONSTANTS = {
  TRIAL_PERIOD_DAYS: 7,
  GRACE_PERIOD_DAYS: 3,
  MAX_DEVICES: {
    BASIC: 1,
    STANDARD: 2,
    PREMIUM: 4,
    FAMILY: 6,
  },
  MAX_DOWNLOADS: {
    BASIC: 5,
    STANDARD: 10,
    PREMIUM: 20,
    FAMILY: 50,
  },
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'] as const,
  PAYMENT_METHODS: ['stripe', 'razorpay', 'paypal', 'apple_pay', 'google_pay'] as const,
} as const;

// Cache constants
export const CACHE_CONSTANTS = {
  TTL: {
    SHORT: 5 * 60, // 5 minutes
    MEDIUM: 30 * 60, // 30 minutes
    LONG: 2 * 60 * 60, // 2 hours
    EXTRA_LONG: 24 * 60 * 60, // 24 hours
  },
  KEYS: {
    USER_PROFILE: 'user_profile:',
    CONTENT_DETAILS: 'content:',
    TRENDING_CONTENT: 'trending:',
    FEATURED_CONTENT: 'featured:',
    GENRES: 'genres',
    SUBSCRIPTION_PLANS: 'subscription_plans',
    SYSTEM_CONFIG: 'system_config',
  },
} as const;

// File upload constants
export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    VIDEO: 10 * 1024 * 1024 * 1024, // 10GB
    SUBTITLE: 1 * 1024 * 1024, // 1MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
  },
  ALLOWED_MIME_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
    VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
    SUBTITLE: ['text/vtt', 'text/srt', 'application/x-subrip'],
    DOCUMENT: ['application/pdf', 'text/plain'],
  },
  UPLOAD_CHUNK_SIZE: 5 * 1024 * 1024, // 5MB chunks
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
  PASSWORD_TOO_WEAK: 'PASSWORD_TOO_WEAK',

  // Content errors
  CONTENT_NOT_FOUND: 'CONTENT_NOT_FOUND',
  CONTENT_NOT_AVAILABLE: 'CONTENT_NOT_AVAILABLE',
  INVALID_CONTENT_TYPE: 'INVALID_CONTENT_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  PROCESSING_FAILED: 'PROCESSING_FAILED',

  // Subscription errors
  SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  PLAN_NOT_FOUND: 'PLAN_NOT_FOUND',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  INVALID_COUPON: 'INVALID_COUPON',

  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

// Rate limiting
export const RATE_LIMITS = {
  AUTH: {
    LOGIN: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes
    REGISTER: { windowMs: 60 * 60 * 1000, max: 3 }, // 3 attempts per hour
    FORGOT_PASSWORD: { windowMs: 60 * 60 * 1000, max: 3 }, // 3 attempts per hour
  },
  API: {
    GENERAL: { windowMs: 15 * 60 * 1000, max: 100 }, // 100 requests per 15 minutes
    SEARCH: { windowMs: 60 * 1000, max: 10 }, // 10 searches per minute
    UPLOAD: { windowMs: 60 * 60 * 1000, max: 5 }, // 5 uploads per hour
  },
} as const;

// Notification constants
export const NOTIFICATION_CONSTANTS = {
  TYPES: ['info', 'success', 'warning', 'error'] as const,
  CATEGORIES: ['system', 'content', 'subscription', 'security', 'marketing'] as const,
  DEFAULT_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
  MAX_NOTIFICATIONS_PER_USER: 50,
} as const;

// Analytics constants
export const ANALYTICS_CONSTANTS = {
  EVENTS: {
    CONTENT_VIEW: 'content_view',
    CONTENT_PLAY: 'content_play',
    CONTENT_PAUSE: 'content_pause',
    CONTENT_COMPLETE: 'content_complete',
    SEARCH: 'search',
    SUBSCRIPTION_CREATED: 'subscription_created',
    SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
    USER_REGISTERED: 'user_registered',
    USER_LOGIN: 'user_login',
  },
  RETENTION_PERIOD: 365, // days
  BATCH_SIZE: 100,
} as const;

// Environment constants
export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

// Security constants
export const SECURITY_CONSTANTS = {
  BCRYPT_ROUNDS: 12,
  JWT_ALGORITHM: 'HS256' as const,
  PASSWORD_RESET_TOKEN_LENGTH: 32,
  EMAIL_VERIFICATION_TOKEN_LENGTH: 32,
  SESSION_SECRET_LENGTH: 64,
  ENCRYPTION_KEY_LENGTH: 32,
  CORS_MAX_AGE: 24 * 60 * 60, // 24 hours
} as const;