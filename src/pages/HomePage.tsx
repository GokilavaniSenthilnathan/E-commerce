import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import NewsletterSection from '../components/home/NewsletterSection';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Starry Heroes | Comic-Inspired T-Shirts</title>
        <meta name="description" content="Discover unique T-shirts featuring your favorite comic superheroes reimagined through the artistic lens of Van Gogh's Starry Night." />
      </Helmet>
      
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <Features />
      <Testimonials />
      <NewsletterSection />
    </>
  );
};

export default HomePage;