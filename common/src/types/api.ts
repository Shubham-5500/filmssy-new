// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
  timestamp: string;
  requestId?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// API Request interfaces
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  q?: string;
  category?: string;
  genre?: string;
  year?: number;
  rating?: number;
  language?: string;
  country?: string;
}

export interface ContentQuery extends PaginationQuery {
  type?: string;
  status?: string;
  featured?: boolean;
  genreId?: string;
  releaseYear?: number;
  language?: string;
  sortBy?: 'title' | 'releaseDate' | 'views' | 'rating' | 'createdAt';
}

// Notification interfaces
export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  data?: Record<string, any>;
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  actionText?: string;
  imageUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export enum NotificationCategory {
  SYSTEM = 'system',
  CONTENT = 'content',
  SUBSCRIPTION = 'subscription',
  SECURITY = 'security',
  MARKETING = 'marketing'
}

// Analytics interfaces
export interface AnalyticsEvent {
  userId?: string;
  sessionId: string;
  event: string;
  category: string;
  properties?: Record<string, any>;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  device?: {
    type: 'mobile' | 'desktop' | 'tablet' | 'tv';
    os: string;
    browser?: string;
  };
}

export interface ViewingSession {
  _id: string;
  userId?: string;
  sessionId: string;
  contentId: string;
  contentType: string;
  episodeId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // total session duration in seconds
  watchedDuration: number; // actual watched duration
  quality: string;
  device: string;
  platform: string;
  ipAddress: string;
  country: string;
  events: ViewingEvent[];
}

export interface ViewingEvent {
  type: 'play' | 'pause' | 'seek' | 'quality_change' | 'fullscreen' | 'exit';
  timestamp: Date;
  position: number; // video position in seconds
  data?: Record<string, any>;
}

// Upload interfaces
export interface UploadProgress {
  uploadId: string;
  filename: string;
  size: number;
  uploaded: number;
  percentage: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  data?: any; // File data - type depends on environment
  filename?: string;
  path?: string;
}

// System configuration
export interface SystemConfig {
  _id: string;
  key: string;
  value: any;
  description?: string;
  category: 'general' | 'security' | 'payment' | 'media' | 'analytics';
  isPublic: boolean; // whether to expose in client config
  updatedBy: string;
  updatedAt: Date;
}

// Error interfaces
export interface AppError extends Error {
  statusCode: number;
  code?: string;
  details?: any;
  isOperational: boolean;
}

// Health check interface
export interface HealthCheck {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    storage: ServiceStatus;
    streaming: ServiceStatus;
  };
  version: string;
  environment: string;
}

export interface ServiceStatus {
  status: 'ok' | 'error';
  responseTime?: number;
  error?: string;
}

// Rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

// Geolocation
export interface GeoLocation {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
}