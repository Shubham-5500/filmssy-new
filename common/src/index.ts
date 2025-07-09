// Export all types
export * from './types/auth';
export * from './types/content';
export * from './types/subscription';
export * from './types/api';

// Export all constants
export * from './constants';

// Utility functions
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100); // assuming amount is in cents
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const calculateWatchPercentage = (watchedDuration: number, totalDuration: number): number => {
  if (totalDuration === 0) return 0;
  return Math.min(Math.round((watchedDuration / totalDuration) * 100), 100);
};

export const getVideoQualityLabel = (quality: string): string => {
  const qualityMap: Record<string, string> = {
    '480p': 'SD',
    '720p': 'HD',
    '1080p': 'Full HD',
    '2160p': '4K Ultra HD'
  };
  return qualityMap[quality] || quality;
};

export const getAgeRatingColor = (rating: string): string => {
  const colorMap: Record<string, string> = {
    'G': '#4ade80',      // green
    'PG': '#facc15',     // yellow
    'PG-13': '#fb923c',  // orange
    'R': '#ef4444',      // red
    'NC-17': '#dc2626',  // dark red
    'TV-Y': '#4ade80',   // green
    'TV-Y7': '#facc15',  // yellow
    'TV-G': '#4ade80',   // green
    'TV-PG': '#fb923c',  // orange
    'TV-14': '#ef4444',  // red
    'TV-MA': '#dc2626'   // dark red
  };
  return colorMap[rating] || '#6b7280';
};