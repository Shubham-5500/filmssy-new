# 🎬 Filmssy - Premium OTT Streaming Platform

[![Production Ready](https://img.shields.io/badge/production-ready-brightgreen.svg)](https://github.com/your-repo/filmssy)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

A comprehensive, production-grade OTT (Over-The-Top) streaming platform built with modern technologies. Filmssy provides a Netflix-like experience with advanced features including HLS streaming, subscription management, admin dashboard, and mobile app support.

## 🌟 Features

### 🎥 Core Streaming Features
- **High-Quality Video Streaming**: HLS adaptive streaming with multiple quality options (SD, HD, FHD, 4K)
- **Smart Video Player**: Video.js integration with custom controls, subtitle support, and chapter navigation
- **Multi-Audio & Subtitles**: Support for multiple languages and accessibility features
- **Offline Viewing**: Progressive Web App (PWA) capabilities for offline content access
- **Auto-Play**: Smart auto-play for series with next episode recommendations

### 🔐 Security & Authentication
- **JWT Authentication**: Secure access and refresh token system
- **Role-Based Access Control**: User, Admin, and Sub-Admin roles
- **Device Session Management**: Track and manage user sessions across devices
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **DRM Support**: Content protection with tokenized streaming URLs
- **GDPR Compliance**: Privacy-focused data handling

### 💳 Subscription & Payments
- **Multiple Payment Gateways**: Stripe and Razorpay integration
- **Flexible Subscription Plans**: Free, Basic, Premium tiers with customizable features
- **Trial Periods**: Free trial support with automatic conversion
- **Billing Management**: Automated billing, invoicing, and subscription lifecycle management
- **Coupon System**: Discount codes and promotional offers
- **Revenue Analytics**: Comprehensive financial reporting

### 📱 Multi-Platform Support
- **Responsive Web App**: Next.js with Tailwind CSS, dark theme, and mobile-first design
- **React Native Mobile App**: Cross-platform iOS and Android app with Expo
- **Progressive Web App**: Installable web app with offline capabilities
- **Admin Dashboard**: Comprehensive content and user management interface

### 🤖 Smart Features & AI
- **Personalized Recommendations**: ML-based content suggestions using viewing history
- **Content Discovery**: Advanced search with filters, genres, and personalized suggestions
- **Auto-Generated Metadata**: TMDB API integration for automatic content information
- **Smart Playlists**: "Continue Watching", "Because You Watched", "Trending Now"
- **Auto-Subtitles**: OpenAI Whisper integration for automatic subtitle generation

### 🌍 Global Features
- **Multi-Language Support**: i18n support for UI and content
- **Geo-Blocking**: Country-specific content availability
- **CDN Integration**: Global content delivery with BunnyCDN/Cloudflare
- **Currency Localization**: Multiple currency support for global markets

### 📊 Analytics & Monitoring
- **Real-Time Analytics**: User behavior tracking and engagement metrics
- **Performance Monitoring**: Sentry integration for error tracking and performance
- **Business Intelligence**: Revenue analytics, user growth, and content performance
- **Health Monitoring**: System health checks and uptime monitoring

## 🏗️ Architecture

### Project Structure
```
filmssy/
├── web/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── stores/        # State management (Zustand)
│   ├── public/            # Static assets
│   └── package.json
│
├── mobile/                 # React Native mobile app
│   ├── src/
│   │   ├── components/    # Mobile UI components
│   │   ├── screens/       # App screens
│   │   ├── navigation/    # Navigation configuration
│   │   └── services/      # API services
│   ├── assets/            # Mobile assets
│   └── package.json
│
├── backend/                # Node.js API server
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   └── config/        # Configuration files
│   └── package.json
│
├── admin/                  # Admin dashboard
│   ├── src/
│   │   ├── pages/         # Admin pages
│   │   ├── components/    # Admin components
│   │   └── utils/         # Admin utilities
│   └── package.json
│
├── services/               # Background services
│   ├── video-processor/   # Video encoding service
│   ├── notification/      # Push notification service
│   └── analytics/         # Analytics processing
│
├── common/                 # Shared types and utilities
│   ├── src/
│   │   ├── types/         # TypeScript interfaces
│   │   ├── constants/     # Shared constants
│   │   └── utils/         # Common utilities
│   └── package.json
│
└── docs/                   # Documentation
    ├── deployment/        # Deployment guides
    ├── api/              # API documentation
    └── user-guide/       # User manuals
```

### Technology Stack

#### Frontend (Web)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state
- **API Client**: SWR for data fetching and caching
- **Video Player**: Video.js with HLS.js for adaptive streaming
- **Authentication**: NextAuth.js integration
- **PWA**: next-pwa for offline capabilities

#### Mobile (React Native)
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit with RTK Query
- **Video Player**: react-native-video with HLS support
- **Notifications**: OneSignal integration
- **Offline Storage**: AsyncStorage and SQLite

#### Backend (Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh token rotation
- **File Upload**: Multer with Cloudinary/S3 integration
- **Video Processing**: FFmpeg for HLS conversion
- **Background Jobs**: Bull Queue with Redis
- **Email**: Nodemailer with template support
- **Monitoring**: Winston logging and Sentry error tracking

#### Infrastructure
- **Database**: MongoDB Atlas with replica sets
- **Cache**: Redis for sessions and caching
- **CDN**: Cloudflare or BunnyCDN for global delivery
- **Storage**: AWS S3 or Cloudinary for media files
- **Payments**: Stripe and Razorpay integration
- **Monitoring**: Sentry for error tracking and performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB
- Redis instance
- Cloudinary or AWS S3 account
- Stripe/Razorpay account for payments

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/your-repo/filmssy.git
cd filmssy

# Install dependencies for all packages
npm install

# Install individual package dependencies
cd backend && npm install
cd ../web && npm install
cd ../mobile && npm install
cd ../admin && npm install
cd ../common && npm install
```

### 2. Environment Configuration

#### Backend Environment (.env)
```bash
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/filmssy
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# File Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateways
STRIPE_SECRET_KEY=sk_test_xxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# External APIs
TMDB_API_KEY=your_tmdb_api_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Security
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

#### Web Environment (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXX-XXX
```

### 3. Start Development Servers
```bash
# Start all services
npm run dev

# Or start individually
npm run dev:backend    # Backend API (Port 5000)
npm run dev:web        # Web app (Port 3000)
npm run dev:mobile     # Mobile app (Expo)
npm run dev:admin      # Admin dashboard (Port 3001)
```

### 4. Seed Sample Data
```bash
cd backend
npm run db:seed
```

## 📖 API Documentation

### Authentication Endpoints
```
POST /api/v1/auth/register          # User registration
POST /api/v1/auth/login             # User login
POST /api/v1/auth/refresh           # Refresh access token
POST /api/v1/auth/logout            # User logout
POST /api/v1/auth/forgot-password   # Password reset request
POST /api/v1/auth/reset-password    # Password reset confirmation
```

### Content Endpoints
```
GET  /api/v1/content                # Get content list with pagination
GET  /api/v1/content/:id            # Get content details
GET  /api/v1/content/trending       # Get trending content
GET  /api/v1/content/search         # Search content
POST /api/v1/content                # Create content (Admin)
PUT  /api/v1/content/:id            # Update content (Admin)
DELETE /api/v1/content/:id          # Delete content (Admin)
```

### User Endpoints
```
GET  /api/v1/users/profile          # Get user profile
PUT  /api/v1/users/profile          # Update user profile
GET  /api/v1/users/watchlist        # Get user watchlist
POST /api/v1/users/watchlist        # Add to watchlist
DELETE /api/v1/users/watchlist/:id  # Remove from watchlist
GET  /api/v1/users/history          # Get watch history
POST /api/v1/users/history          # Update watch progress
```

### Subscription Endpoints
```
GET  /api/v1/subscriptions/plans    # Get subscription plans
POST /api/v1/subscriptions          # Create subscription
GET  /api/v1/subscriptions/current  # Get current subscription
PUT  /api/v1/subscriptions/cancel   # Cancel subscription
POST /api/v1/subscriptions/upgrade  # Upgrade subscription
```

### Streaming Endpoints
```
GET  /api/v1/streaming/token/:id    # Get streaming token
GET  /api/v1/streaming/manifest/:id # Get HLS manifest
POST /api/v1/streaming/analytics    # Report viewing analytics
```

## 🎨 UI Components

### Core Components
- **Header**: Navigation with search, user menu, and notifications
- **VideoPlayer**: Advanced player with HLS streaming and controls
- **ContentCard**: Reusable content display with hover effects
- **ContentRow**: Horizontal scrolling content sections
- **Modal**: Reusable modal for content details and forms
- **LoadingSpinner**: Consistent loading states across the app

### Form Components
- **Input**: Styled input fields with validation
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Checkbox**: Custom checkbox with animations
- **Select**: Dropdown with search capabilities
- **FormField**: Wrapper with label and error handling

### Layout Components
- **Sidebar**: Collapsible navigation sidebar
- **Grid**: Responsive content grid layouts
- **Container**: Consistent page containers
- **Section**: Page sections with proper spacing

## 📱 Mobile App Features

### Core Features
- **Native Navigation**: Tab-based navigation with stack navigation
- **Video Streaming**: Native video player with HLS support
- **Offline Support**: Download content for offline viewing
- **Push Notifications**: Real-time notifications for new content
- **Social Sharing**: Share content with friends
- **Biometric Auth**: Fingerprint and Face ID support

### Platform-Specific Features
- **iOS**: Picture-in-Picture support, AirPlay integration
- **Android**: Background playback, Chromecast support

## 🛠️ Admin Dashboard

### Content Management
- **Content Library**: Browse, search, and filter all content
- **Content Editor**: Rich editor for content metadata
- **Bulk Operations**: Batch content operations
- **Media Upload**: Direct video and image uploads
- **TMDB Import**: Import content from TMDB API

### User Management
- **User Directory**: Search and manage users
- **Subscription Management**: View and modify subscriptions
- **Analytics Dashboard**: User engagement and behavior analytics
- **Support Tools**: User communication and support tickets

### System Administration
- **System Health**: Monitor system performance and health
- **Configuration**: Manage app settings and feature flags
- **Email Templates**: Customize automated emails
- **API Keys**: Manage external API integrations

## 🔧 Deployment

### Production Deployment

#### Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# Scale specific services
docker-compose up -d --scale api=3
```

#### Manual Deployment

1. **Backend Deployment** (Railway/Heroku)
```bash
cd backend
npm run build
npm start
```

2. **Web App Deployment** (Vercel)
```bash
cd web
npm run build
vercel deploy
```

3. **Mobile App Deployment**
```bash
cd mobile
expo build:ios        # iOS build
expo build:android     # Android build
```

#### Infrastructure Setup

1. **MongoDB Atlas**: Set up cluster with proper security rules
2. **Redis**: Configure Redis instance (AWS ElastiCache/Redis Cloud)
3. **CDN**: Set up Cloudflare or BunnyCDN for global content delivery
4. **Storage**: Configure AWS S3 or Cloudinary for media storage
5. **Monitoring**: Set up Sentry for error tracking and performance monitoring

### Environment-Specific Configurations

#### Production Environment Variables
```bash
# Production security
NODE_ENV=production
CORS_ORIGIN=https://filmssy.com
COOKIE_SECURE=true

# Production databases
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/filmssy
REDIS_URL=redis://your-redis-url

# Production APIs
STRIPE_SECRET_KEY=sk_live_xxx
TMDB_API_KEY=your_production_key
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Frontend Testing
```bash
cd web
npm test                    # Run tests
npm run test:e2e           # E2E tests with Cypress
```

### Mobile Testing
```bash
cd mobile
npm test                    # Unit tests
npm run test:e2e           # E2E tests with Detox
```

## 📊 Analytics & Monitoring

### Key Metrics
- **User Engagement**: Watch time, completion rates, session duration
- **Content Performance**: Popular content, trending metrics
- **Revenue Metrics**: Subscription conversion, churn rate, ARPU
- **Technical Metrics**: Page load times, error rates, uptime

### Monitoring Tools
- **Application Monitoring**: Sentry for error tracking
- **Performance Monitoring**: Web Vitals, Core Web Vitals
- **User Analytics**: Custom analytics with PostHog/Mixpanel
- **Infrastructure Monitoring**: Health checks and alerting

## 🔒 Security Features

### Data Protection
- **Encryption**: Data encryption at rest and in transit
- **JWT Security**: Secure token handling with rotation
- **CORS Protection**: Strict CORS policies
- **Rate Limiting**: API rate limiting and DDoS protection
- **Input Validation**: Comprehensive input validation and sanitization

### Content Protection
- **DRM**: Digital Rights Management for premium content
- **Watermarking**: User-specific watermarks on streams
- **Geo-blocking**: Location-based content restrictions
- **Token Authentication**: Signed URLs for secure streaming

## 🌐 Internationalization

### Supported Languages
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Hindi (hi)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)

### Localization Features
- **UI Translation**: Complete interface translation
- **Content Metadata**: Localized titles and descriptions
- **Currency Support**: Multiple currencies with conversion
- **Date/Time Formatting**: Locale-specific formatting

## 📞 Support & Maintenance

### Development Team
- **Frontend Team**: React/Next.js specialists
- **Backend Team**: Node.js and MongoDB experts
- **Mobile Team**: React Native developers
- **DevOps Team**: Infrastructure and deployment specialists

### Support Channels
- **Documentation**: Comprehensive docs and guides
- **Issue Tracking**: GitHub Issues for bug reports
- **Community**: Discord/Slack for discussions
- **Enterprise Support**: Dedicated support for enterprise clients

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain test coverage above 80%
3. Use conventional commits for commit messages
4. Ensure proper documentation for new features
5. Follow the established code style and linting rules

## 🚀 Roadmap

### Short Term (Q1 2024)
- [ ] Live streaming support
- [ ] Enhanced mobile app features
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant architecture

### Medium Term (Q2-Q3 2024)
- [ ] AI-powered content recommendations
- [ ] Smart TV app development
- [ ] Advanced DRM implementation
- [ ] Real-time chat during streams

### Long Term (Q4 2024+)
- [ ] Blockchain integration for content rights
- [ ] VR/AR content support
- [ ] Advanced AI features
- [ ] Global CDN optimization

---

**Built with ❤️ by the Filmssy Team**

For questions, support, or enterprise licensing, contact us at [contact@filmssy.com](mailto:contact@filmssy.com)
