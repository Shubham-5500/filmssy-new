import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ContentRow } from '@/components/home/ContentRow';
import { ContinueWatching } from '@/components/home/ContinueWatching';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { GenreRow } from '@/components/home/GenreRow';
import { PersonalizedSection } from '@/components/home/PersonalizedSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Home - Filmssy',
  description: 'Discover trending movies and TV shows on Filmssy. Stream your favorite content in high quality.',
  openGraph: {
    title: 'Filmssy - Your Premium Streaming Destination',
    description: 'Discover trending movies and TV shows on Filmssy. Stream your favorite content in high quality.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <main className="relative">
        {/* Hero Section with Featured Content */}
        <HeroSection />
        
        {/* Continue Watching Section */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContinueWatching />
        </section>
        
        {/* Trending Content */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Trending Now"
            subtitle="What everyone's watching"
            endpoint="/content/trending"
            priority
          />
        </section>
        
        {/* Personalized Recommendations */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <PersonalizedSection />
        </section>
        
        {/* New Releases */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="New Releases"
            subtitle="Fresh content just added"
            endpoint="/content/new-releases"
          />
        </section>
        
        {/* Featured Movies */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <FeaturedContent type="movie" />
        </section>
        
        {/* Popular TV Shows */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Popular TV Shows"
            subtitle="Binge-worthy series"
            endpoint="/content/tv-shows/popular"
          />
        </section>
        
        {/* Action Movies */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <GenreRow
            title="Action & Adventure"
            genreId="action"
            type="movie"
          />
        </section>
        
        {/* Comedy Shows */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <GenreRow
            title="Comedy Series"
            genreId="comedy"
            type="tv"
          />
        </section>
        
        {/* Documentaries */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Award-Winning Documentaries"
            subtitle="Real stories, real impact"
            endpoint="/content/documentaries"
          />
        </section>
        
        {/* International Content */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="International Cinema"
            subtitle="Stories from around the world"
            endpoint="/content/international"
          />
        </section>
        
        {/* Horror & Thriller */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <GenreRow
            title="Horror & Thriller"
            genreId="horror"
            type="both"
          />
        </section>
        
        {/* Family Entertainment */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Family Entertainment"
            subtitle="Fun for all ages"
            endpoint="/content/family"
          />
        </section>
        
        {/* Top Rated Content */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Top Rated"
            subtitle="Critically acclaimed content"
            endpoint="/content/top-rated"
          />
        </section>
        
        {/* Recently Added */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Recently Added"
            subtitle="Latest additions to our library"
            endpoint="/content/recently-added"
          />
        </section>
        
        {/* Because You Watched */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Because You Watched"
            subtitle="More like what you love"
            endpoint="/content/recommendations/similar"
            personalized
          />
        </section>
        
        {/* Trending Genres */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <div className="space-y-8">
            <GenreRow
              title="Sci-Fi & Fantasy"
              genreId="sci-fi"
              type="both"
            />
            <GenreRow
              title="Crime & Mystery"
              genreId="crime"
              type="both"
            />
            <GenreRow
              title="Romance"
              genreId="romance"
              type="both"
            />
          </div>
        </section>
        
        {/* Exclusive Content */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Filmssy Originals"
            subtitle="Exclusive content only on Filmssy"
            endpoint="/content/originals"
            exclusive
          />
        </section>
        
        {/* Coming Soon */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Coming Soon"
            subtitle="Get ready for these upcoming releases"
            endpoint="/content/coming-soon"
          />
        </section>
        
        {/* Watch Again */}
        <section className="px-4 py-8 md:px-6 lg:px-8">
          <ContentRow
            title="Watch Again"
            subtitle="Revisit your favorites"
            endpoint="/content/watch-again"
            personalized
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}