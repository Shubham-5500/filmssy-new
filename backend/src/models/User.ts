// Note: This file will work once mongoose and bcryptjs are installed
// For now, we'll create the structure without the actual imports

// Enum definitions (will be imported from @filmssy/common once available)
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUB_ADMIN = 'sub_admin'
}

// Interface definitions
interface UserPreferences {
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

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  avatar?: string;
  preferences: UserPreferences;
  subscription?: any; // Will be properly typed once subscription types are available
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Document interface that extends User with Mongoose Document methods
export interface UserDocument extends User {
  // Authentication fields
  password: string;
  loginAttempts: number;
  lockUntil?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  
  // Device sessions
  deviceSessions: Array<{
    deviceId: string;
    deviceType: 'web' | 'mobile' | 'tv';
    deviceName: string;
    ipAddress: string;
    userAgent: string;
    lastActivity: Date;
    isActive: boolean;
  }>;
  
  // Social accounts
  socialAccounts: {
    google?: {
      id: string;
      email: string;
    };
    facebook?: {
      id: string;
      email: string;
    };
  };
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
  toJSON(): any;
  isModified(path: string): boolean;
  updateOne(update: any): Promise<any>;
  save(): Promise<UserDocument>;
  isLocked: boolean;
}

// Schema definition (pseudo-code until mongoose is available)
export const createUserSchema = () => {
  // This will be the actual mongoose schema once mongoose is installed
  const userPreferencesSchema = {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
    autoplay: { type: Boolean, default: true },
    subtitleLanguage: { type: String, default: 'en' },
    audioLanguage: { type: String, default: 'en' },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      newReleases: { type: Boolean, default: true },
      recommendations: { type: Boolean, default: true },
    },
  };

  const userSchema = {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Don't include password in queries by default
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    preferences: {
      type: userPreferencesSchema,
      default: () => ({}),
    },
    subscription: {
      planId: { type: String, ref: 'SubscriptionPlan' },
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled', 'expired'],
        default: 'inactive',
      },
      startDate: Date,
      endDate: Date,
      autoRenew: { type: Boolean, default: false },
      paymentMethod: String,
    },
    lastLogin: Date,
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    twoFactorSecret: String,
    twoFactorEnabled: { type: Boolean, default: false },
    deviceSessions: [{
      deviceId: String,
      deviceType: { type: String, enum: ['web', 'mobile', 'tv'] },
      deviceName: String,
      ipAddress: String,
      userAgent: String,
      lastActivity: Date,
      isActive: { type: Boolean, default: true },
    }],
    socialAccounts: {
      google: {
        id: String,
        email: String,
      },
      facebook: {
        id: String,
        email: String,
      },
    },
  };

  return userSchema;
};

// Model methods that will be implemented once mongoose is available
export const UserMethods = {
  // Pre-save middleware to hash password
  preSave: async function(this: UserDocument, next: (error?: Error) => void) {
    if (!this.isModified('password')) return next();

    try {
      // const salt = await bcrypt.genSalt(12);
      // this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error as Error);
    }
  },

  // Instance method to compare password
  comparePassword: async function(this: UserDocument, candidatePassword: string): Promise<boolean> {
    // return bcrypt.compare(candidatePassword, this.password);
    return Promise.resolve(false); // Placeholder
  },

  // Instance method to get full name
  getFullName: function(this: UserDocument): string {
    return `${this.firstName} ${this.lastName}`;
  },

  // Static method to find by email
  findByEmail: function(email: string) {
    // return this.findOne({ email: email.toLowerCase() });
    return null; // Placeholder
  },

  // Method to increment login attempts
  incLoginAttempts: function(this: UserDocument) {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && new Date(this.lockUntil) < new Date()) {
      return this.updateOne({
        $unset: { lockUntil: 1 },
        $set: { loginAttempts: 1 }
      });
    }

    const updates: any = { $inc: { loginAttempts: 1 } };
    
    // If we hit max attempts and it's not locked, lock the account
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
      updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }

    return this.updateOne(updates);
  },

  // Method to reset login attempts
  resetLoginAttempts: function(this: UserDocument) {
    return this.updateOne({
      $unset: { loginAttempts: 1, lockUntil: 1 }
    });
  },

  // Virtual for account locked
  isLockedCheck: function(this: UserDocument): boolean {
    return !!(this.lockUntil && new Date(this.lockUntil) > new Date());
  }
};

// Export placeholder that will be replaced with actual Mongoose model
export const User = {
  // Placeholder methods
  findOne: (query: any) => Promise.resolve(null),
  findById: (id: string) => Promise.resolve(null),
  create: (data: any) => Promise.resolve(null),
  findByIdAndUpdate: (id: string, update: any) => Promise.resolve(null),
  findByIdAndDelete: (id: string) => Promise.resolve(null),
};