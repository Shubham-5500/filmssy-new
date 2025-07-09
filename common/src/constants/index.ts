// API Constants
export const API_VERSION = 'v1';
export const API_BASE_URL = `/api/${API_VERSION}`;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// JWT Token expiry
export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';
export const EMAIL_VERIFICATION_EXPIRY = '24h';
export const PASSWORD_RESET_EXPIRY = '1h';

// Rate limiting
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;
export const LOGIN_RATE_LIMIT = 5; // per 15 minutes
export const FORGOT_PASSWORD_RATE_LIMIT = 3; // per hour

// File upload limits
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const MAX_VIDEO_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/avi', 'video/mov'];
export const ALLOWED_SUBTITLE_TYPES = ['text/vtt', 'application/x-subrip'];

// Content constants
export const VIDEO_QUALITIES = ['480p', '720p', '1080p', '2160p'] as const;
export const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh',
  'hi', 'ar', 'tr', 'nl', 'sv', 'da', 'no', 'fi', 'pl', 'cs'
] as const;

export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'INR', 'JPY', 'KRW', 'CNY', 'BRL', 'MXN', 'AUD'
] as const;

// Streaming constants
export const HLS_SEGMENT_DURATION = 6; // seconds
export const HLS_PLAYLIST_TYPE = 'VOD';
export const DEFAULT_BITRATES = [
  { quality: '480p', bitrate: 1000000 },   // 1 Mbps
  { quality: '720p', bitrate: 2500000 },   // 2.5 Mbps
  { quality: '1080p', bitrate: 5000000 },  // 5 Mbps
  { quality: '2160p', bitrate: 15000000 }  // 15 Mbps
];

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 5 * 60,        // 5 minutes
  MEDIUM: 30 * 60,      // 30 minutes
  LONG: 2 * 60 * 60,    // 2 hours
  VERY_LONG: 24 * 60 * 60  // 24 hours
};

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  EMAIL_VERIFICATION: 'email-verification',
  PASSWORD_RESET: 'password-reset',
  SUBSCRIPTION_CONFIRMATION: 'subscription-confirmation',
  SUBSCRIPTION_RENEWAL: 'subscription-renewal',
  SUBSCRIPTION_CANCELLATION: 'subscription-cancellation',
  PAYMENT_FAILED: 'payment-failed',
  NEW_CONTENT_ALERT: 'new-content-alert'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  NEW_EPISODE: 'new_episode',
  NEW_SEASON: 'new_season',
  NEW_MOVIE: 'new_movie',
  SUBSCRIPTION_EXPIRY: 'subscription_expiry',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  ACCOUNT_SECURITY: 'account_security',
  RECOMMENDATION: 'recommendation'
} as const;

// Social media platforms
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  LINKEDIN: 'linkedin'
} as const;

// Device types
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  TV: 'tv',
  GAMING_CONSOLE: 'gaming_console'
} as const;

// Player events
export const PLAYER_EVENTS = {
  PLAY: 'play',
  PAUSE: 'pause',
  SEEK: 'seek',
  VOLUME_CHANGE: 'volume_change',
  QUALITY_CHANGE: 'quality_change',
  FULLSCREEN_ENTER: 'fullscreen_enter',
  FULLSCREEN_EXIT: 'fullscreen_exit',
  SUBTITLE_CHANGE: 'subtitle_change',
  AUDIO_CHANGE: 'audio_change',
  PLAYBACK_RATE_CHANGE: 'playback_rate_change',
  BUFFER_START: 'buffer_start',
  BUFFER_END: 'buffer_end',
  ERROR: 'error',
  ENDED: 'ended'
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  CONTENT_VIEW: 'content_view',
  CONTENT_PLAY: 'content_play',
  CONTENT_PAUSE: 'content_pause',
  CONTENT_COMPLETE: 'content_complete',
  SEARCH: 'search',
  SIGNUP: 'signup',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SUBSCRIPTION_START: 'subscription_start',
  SUBSCRIPTION_CANCEL: 'subscription_cancel',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  CONTENT_SHARE: 'content_share',
  CONTENT_LIKE: 'content_like',
  CONTENT_DOWNLOAD: 'content_download',
  PROFILE_UPDATE: 'profile_update'
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  
  // Authorization errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ACCESS_DENIED: 'ACCESS_DENIED',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // Resource errors
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Subscription errors
  SUBSCRIPTION_REQUIRED: 'SUBSCRIPTION_REQUIRED',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  
  // Content errors
  CONTENT_NOT_AVAILABLE: 'CONTENT_NOT_AVAILABLE',
  CONTENT_GEO_BLOCKED: 'CONTENT_GEO_BLOCKED',
  CONTENT_PROCESSING: 'CONTENT_PROCESSING',
  
  // Upload errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  
  // System errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR'
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s-()]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  YOUTUBE_URL: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  TMDB_ID: /^\d+$/,
  IMDB_ID: /^tt\d{7,8}$/
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_DOWNLOADS: 'enable_downloads',
  ENABLE_OFFLINE_MODE: 'enable_offline_mode',
  ENABLE_SOCIAL_FEATURES: 'enable_social_features',
  ENABLE_RECOMMENDATIONS: 'enable_recommendations',
  ENABLE_ANALYTICS: 'enable_analytics',
  ENABLE_PUSH_NOTIFICATIONS: 'enable_push_notifications',
  ENABLE_EMAIL_NOTIFICATIONS: 'enable_email_notifications',
  ENABLE_LIVE_STREAMING: 'enable_live_streaming',
  ENABLE_COMMENTS: 'enable_comments',
  ENABLE_RATINGS: 'enable_ratings'
} as const;