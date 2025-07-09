// User roles
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUB_ADMIN = 'sub_admin'
}

// Auth schemas using Zod (will be available when zod is installed)
export const loginSchema = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return null;
  },
  password: (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    return null;
  }
};

export const registerSchema = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return null;
  },
  password: (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    return null;
  },
  firstName: (value: string) => {
    if (value.length < 2) return 'First name must be at least 2 characters';
    return null;
  },
  lastName: (value: string) => {
    if (value.length < 2) return 'Last name must be at least 2 characters';
    return null;
  }
};

// Type definitions
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export interface ResetPasswordData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User interface
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  avatar?: string;
  preferences: UserPreferences;
  subscription?: UserSubscription;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface UserPreferences {
  language: string;
  currency: string;
  autoplay: boolean;
  subtitleLanguage: string;
  audioLanguage: string;
  notifications: {
    email: boolean;
    push: boolean;
    newReleases: boolean;
    recommendations: boolean;
  };
}

export interface UserSubscription {
  planId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}

// JWT Token interfaces
export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: TokenPair;
}

// Device session
export interface DeviceSession {
  _id: string;
  userId: string;
  deviceId: string;
  deviceType: 'web' | 'mobile' | 'tv';
  deviceName: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActivity: Date;
  createdAt: Date;
}