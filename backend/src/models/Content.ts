import mongoose, { Schema, Document } from 'mongoose';
import {
  BaseContent,
  Movie,
  TVShow,
  ContentType,
  ContentStatus,
  AgeRating,
  VideoQuality,
  Genre,
  CastMember,
  CrewMember,
  VideoFile,
  Subtitle,
  AudioTrack,
  VisibilitySettings
} from '@filmssy/common';

export interface ContentDocument extends BaseContent, Document {
  generateSlug(): void;
  isAvailableForUser(userId?: string): boolean;
  getStreamingUrl(quality?: VideoQuality): string | null;
}

const genreSchema = new Schema<Genre>({
  _id: Schema.Types.ObjectId,
  name: String,
  slug: String,
  description: String,
  color: String,
  icon: String,
  isActive: Boolean,
  sortOrder: Number,
});

const castMemberSchema = new Schema<CastMember>({
  personId: { type: String, required: true },
  name: { type: String, required: true },
  character: { type: String, required: true },
  photo: String,
  order: { type: Number, default: 0 },
  isMainCast: { type: Boolean, default: false },
});

const crewMemberSchema = new Schema<CrewMember>({
  personId: { type: String, required: true },
  name: { type: String, required: true },
  job: { type: String, required: true },
  department: { type: String, required: true },
  photo: String,
});

const videoFileSchema = new Schema<VideoFile>({
  url: { type: String, required: true },
  quality: {
    type: String,
    enum: Object.values(VideoQuality),
    required: true,
  },
  format: {
    type: String,
    enum: ['hls', 'dash', 'mp4'],
    required: true,
  },
  size: { type: Number, required: true },
  duration: { type: Number, required: true },
  isEncrypted: { type: Boolean, default: false },
  hlsManifest: String,
  dashManifest: String,
  uploadedAt: { type: Date, default: Date.now },
});

const subtitleSchema = new Schema<Subtitle>({
  language: { type: String, required: true },
  languageCode: { type: String, required: true },
  url: { type: String, required: true },
  format: {
    type: String,
    enum: ['vtt', 'srt', 'ass'],
    default: 'vtt',
  },
  isDefault: { type: Boolean, default: false },
  isForced: { type: Boolean, default: false },
  isSDH: { type: Boolean, default: false },
});

const audioTrackSchema = new Schema<AudioTrack>({
  language: { type: String, required: true },
  languageCode: { type: String, required: true },
  codec: { type: String, required: true },
  channels: { type: Number, default: 2 },
  isDefault: { type: Boolean, default: false },
  isDescriptive: { type: Boolean, default: false },
});

const visibilitySettingsSchema = new Schema<VisibilitySettings>({
  isPublic: { type: Boolean, default: true },
  publishDate: Date,
  expiryDate: Date,
  requiresSubscription: { type: Boolean, default: false },
  allowedPlans: [{ type: Schema.Types.ObjectId, ref: 'SubscriptionPlan' }],
  geoBlocked: { type: Boolean, default: false },
  allowedCountries: [String],
  blockedCountries: [String],
});

const contentSchema = new Schema<ContentDocument>({
  title: { type: String, required: true, trim: true },
  originalTitle: { type: String, trim: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  synopsis: { type: String },
  type: {
    type: String,
    enum: Object.values(ContentType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ContentStatus),
    default: ContentStatus.DRAFT,
  },
  poster: { type: String, required: true },
  backdrop: String,
  trailer: String,
  genres: [genreSchema],
  cast: [castMemberSchema],
  crew: [crewMemberSchema],
  releaseDate: { type: Date, required: true },
  ageRating: {
    type: String,
    enum: Object.values(AgeRating),
    required: true,
  },
  duration: { type: Number, required: true }, // in minutes
  language: { type: String, required: true },
  country: { type: String, required: true },
  subtitles: [subtitleSchema],
  audioTracks: [audioTrackSchema],
  keywords: [String],
  tmdbId: String,
  imdbId: String,
  ratings: {
    imdb: { type: Number, min: 0, max: 10 },
    tmdb: { type: Number, min: 0, max: 10 },
    filmssy: { type: Number, min: 0, max: 10, default: 0 },
  },
  views: { type: Number, default: 0 },
  watchTime: { type: Number, default: 0 }, // total watch time in minutes
  isExclusive: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  regionBlocks: [String], // country codes
  visibilitySettings: visibilitySettingsSchema,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Movie-specific fields
  videoFiles: [videoFileSchema],
  chapters: [{
    title: String,
    startTime: Number,
    endTime: Number,
    thumbnail: String,
  }],
  relatedContent: [{ type: Schema.Types.ObjectId, ref: 'Content' }],

  // TV Show-specific fields
  totalSeasons: { type: Number, default: 0 },
  totalEpisodes: { type: Number, default: 0 },
  currentSeason: Number,
  isCompleted: { type: Boolean, default: false },
  nextEpisodeDate: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
contentSchema.index({ title: 'text', description: 'text', keywords: 'text' });
contentSchema.index({ slug: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ status: 1 });
contentSchema.index({ 'genres.slug': 1 });
contentSchema.index({ releaseDate: -1 });
contentSchema.index({ views: -1 });
contentSchema.index({ isFeatured: 1 });
contentSchema.index({ isExclusive: 1 });
contentSchema.index({ createdAt: -1 });
contentSchema.index({ 'visibilitySettings.isPublic': 1 });

// Virtual for average rating
contentSchema.virtual('averageRating').get(function() {
  const ratings = [this.ratings.imdb, this.ratings.tmdb, this.ratings.filmssy].filter(r => r && r > 0);
  return ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
});

// Pre-save middleware to generate slug
contentSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.generateSlug();
  }
  next();
});

// Method to generate slug
contentSchema.methods.generateSlug = function() {
  const baseSlug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  this.slug = `${baseSlug}-${Date.now()}`;
};

// Method to check if content is available for user
contentSchema.methods.isAvailableForUser = function(userId?: string) {
  // Check if content is published
  if (this.status !== ContentStatus.PUBLISHED) {
    return false;
  }

  // Check visibility settings
  if (!this.visibilitySettings.isPublic) {
    return false;
  }

  // Check publish date
  if (this.visibilitySettings.publishDate && this.visibilitySettings.publishDate > new Date()) {
    return false;
  }

  // Check expiry date
  if (this.visibilitySettings.expiryDate && this.visibilitySettings.expiryDate < new Date()) {
    return false;
  }

  // Additional checks for subscription requirements would go here
  return true;
};

// Method to get streaming URL
contentSchema.methods.getStreamingUrl = function(quality: VideoQuality = VideoQuality.HD) {
  const videoFile = this.videoFiles.find(file => file.quality === quality);
  return videoFile ? videoFile.url : null;
};

export const Content = mongoose.model<ContentDocument>('Content', contentSchema);