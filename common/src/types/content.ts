import { z } from 'zod';

// Content types
export enum ContentType {
  MOVIE = 'movie',
  TV_SHOW = 'tv_show',
  DOCUMENTARY = 'documentary',
  SHORT = 'short'
}

export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  COMING_SOON = 'coming_soon'
}

export enum VideoQuality {
  SD = '480p',
  HD = '720p',
  FULL_HD = '1080p',
  UHD_4K = '2160p'
}

export enum AgeRating {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG-13',
  R = 'R',
  NC_17 = 'NC-17',
  TV_Y = 'TV-Y',
  TV_Y7 = 'TV-Y7',
  TV_G = 'TV-G',
  TV_PG = 'TV-PG',
  TV_14 = 'TV-14',
  TV_MA = 'TV-MA'
}

// Content validation schemas
export const videoUploadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.nativeEnum(ContentType),
  genreIds: z.array(z.string()).min(1, 'At least one genre is required'),
  releaseDate: z.string().transform(str => new Date(str)),
  ageRating: z.nativeEnum(AgeRating),
  duration: z.number().min(1, 'Duration must be positive'),
  language: z.string().min(2, 'Language is required'),
  country: z.string().min(2, 'Country is required'),
  tmdbId: z.string().optional(),
  imdbId: z.string().optional()
});

// Base content interface
export interface BaseContent {
  _id: string;
  title: string;
  originalTitle?: string;
  slug: string;
  description: string;
  synopsis?: string;
  type: ContentType;
  status: ContentStatus;
  poster: string;
  backdrop?: string;
  trailer?: string;
  genres: Genre[];
  cast: CastMember[];
  crew: CrewMember[];
  releaseDate: Date;
  ageRating: AgeRating;
  duration: number; // in minutes
  language: string;
  country: string;
  subtitles: Subtitle[];
  audioTracks: AudioTrack[];
  keywords: string[];
  tmdbId?: string;
  imdbId?: string;
  ratings: {
    imdb?: number;
    tmdb?: number;
    filmssy?: number;
  };
  views: number;
  watchTime: number; // total watch time in minutes
  isExclusive: boolean;
  isFeatured: boolean;
  regionBlocks: string[]; // country codes
  visibilitySettings: VisibilitySettings;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // admin user ID
}

// Movie interface
export interface Movie extends BaseContent {
  type: ContentType.MOVIE;
  videoFiles: VideoFile[];
  chapters?: Chapter[];
  relatedContent: string[]; // content IDs
}

// TV Show interface
export interface TVShow extends BaseContent {
  type: ContentType.TV_SHOW;
  totalSeasons: number;
  totalEpisodes: number;
  seasons: Season[];
  currentSeason?: number;
  isCompleted: boolean;
  nextEpisodeDate?: Date;
}

// Season interface
export interface Season {
  _id: string;
  showId: string;
  seasonNumber: number;
  title: string;
  description?: string;
  poster?: string;
  episodes: Episode[];
  releaseDate: Date;
  isComplete: boolean;
}

// Episode interface
export interface Episode {
  _id: string;
  showId: string;
  seasonId: string;
  episodeNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  videoFiles: VideoFile[];
  airDate: Date;
  isFinale: boolean;
  isSpecial: boolean;
  previousEpisodeId?: string;
  nextEpisodeId?: string;
}

// Video file interface
export interface VideoFile {
  _id: string;
  url: string;
  quality: VideoQuality;
  format: 'hls' | 'dash' | 'mp4';
  size: number; // in bytes
  duration: number; // in seconds
  isEncrypted: boolean;
  hlsManifest?: string; // .m3u8 URL
  dashManifest?: string; // .mpd URL
  uploadedAt: Date;
}

// Genre interface
export interface Genre {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
}

// Cast and crew interfaces
export interface CastMember {
  personId: string;
  name: string;
  character: string;
  photo?: string;
  order: number;
  isMainCast: boolean;
}

export interface CrewMember {
  personId: string;
  name: string;
  job: string;
  department: string;
  photo?: string;
}

// Person interface
export interface Person {
  _id: string;
  name: string;
  biography?: string;
  photo?: string;
  birthDate?: Date;
  deathDate?: Date;
  birthPlace?: string;
  popularity: number;
  tmdbId?: string;
  imdbId?: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  knownFor: string[]; // content IDs
  createdAt: Date;
  updatedAt: Date;
}

// Subtitle interface
export interface Subtitle {
  _id: string;
  language: string;
  languageCode: string; // ISO 639-1
  url: string;
  format: 'vtt' | 'srt' | 'ass';
  isDefault: boolean;
  isForced: boolean; // for signs/songs
  isSDH: boolean; // for hearing impaired
}

// Audio track interface
export interface AudioTrack {
  _id: string;
  language: string;
  languageCode: string; // ISO 639-1
  codec: string;
  channels: number;
  isDefault: boolean;
  isDescriptive: boolean; // audio description
}

// Chapter interface
export interface Chapter {
  _id: string;
  title: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  thumbnail?: string;
}

// Visibility settings
export interface VisibilitySettings {
  isPublic: boolean;
  publishDate?: Date;
  expiryDate?: Date;
  requiresSubscription: boolean;
  allowedPlans: string[]; // plan IDs
  geoBlocked: boolean;
  allowedCountries: string[];
  blockedCountries: string[];
}

// Content collection (for curated lists)
export interface ContentCollection {
  _id: string;
  title: string;
  description?: string;
  type: 'manual' | 'auto' | 'trending' | 'new_releases' | 'continue_watching';
  content: string[]; // content IDs
  rules?: CollectionRule[]; // for auto collections
  poster?: string;
  isActive: boolean;
  sortOrder: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionRule {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in';
  value: any;
}

// User interaction interfaces
export interface WatchHistory {
  _id: string;
  userId: string;
  contentId: string;
  contentType: ContentType;
  episodeId?: string; // for TV shows
  watchedDuration: number; // in seconds
  totalDuration: number; // in seconds
  watchedPercentage: number;
  isCompleted: boolean;
  lastWatchedAt: Date;
  createdAt: Date;
}

export interface Watchlist {
  _id: string;
  userId: string;
  contentId: string;
  contentType: ContentType;
  addedAt: Date;
}

export interface Rating {
  _id: string;
  userId: string;
  contentId: string;
  contentType: ContentType;
  rating: number; // 1-10
  review?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Search and recommendation
export interface SearchResult {
  content: BaseContent[];
  persons: Person[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Recommendation {
  contentId: string;
  score: number;
  reason: string;
  type: 'collaborative' | 'content_based' | 'trending' | 'new_release';
}

// Type exports for validation
export type VideoUploadData = z.infer<typeof videoUploadSchema>;