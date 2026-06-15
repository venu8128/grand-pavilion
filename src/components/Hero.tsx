"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Slide {
  image: string;
  tagline: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600',
    tagline: 'TRADITIONAL HERITAGE. MODERN ARTISTRY.',
    title: 'KOWSHIK',
    subtitle: "Welcome to India's largest restaurant. Savor heritage Indian recipes reimagined with contemporary culinary mastery in a luxurious architectural sanctuary.",
  },
  {
    image: 'https://images.unsplash.com/photo-1585938338392-50a59999354e?auto=format&fit=crop&q=80&w=1600',
    tagline: 'A CULINARY REVELATION.',
    title: 'SENSORY EXPERIENCE',
    subtitle: "Embark on an aromatic expedition through India's rich culinary landscape, where each ingredient is harvested at its peak and slow-cooked to perfection.",
  },
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
    tagline: "A TASTE YOU'LL NEVER FORGET.",
    title: 'CRAFTED TO DELIGHT',
    subtitle: 'From smoke-infused tandoor masterpieces to gold-leaf dessert garnishes, every plate tells a story of culinary dedication and passion.',
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-black flex items-center justify-center">
      
      {/* Background Image Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={slides[current].image}
              alt="Culinary Masterpiece backdrop"
              className="h-full w-full object-cover brightness-[0.35]"
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-luxury-gold uppercase mb-3">
              {slides[current].tagline}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.15em] text-luxury-cream mb-6 leading-tight">
              {slides[current].title}
            </h1>
            <div className="h-[1px] w-24 bg-luxury-gold/55 mb-6" />
            <p className="text-sm sm:text-base md:text-lg text-luxury-cream/80 max-w-2xl font-light mb-8 leading-relaxed">
              {slides[current].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/#reserve"
                className="flex items-center gap-2 rounded-md bg-luxury-gold px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-luxury-black transition-colors hover:bg-luxury-lightGold"
              >
                <Calendar size={14} />
                <span>Reserve a Table</span>
              </Link>
              <Link
                href="/#menu"
                className="flex items-center gap-2 rounded-md border border-luxury-cream/30 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-luxury-cream transition-colors hover:border-luxury-gold hover:text-luxury-gold"
              >
                <span>Explore Menu</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Slide Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-luxury-cream/25 text-luxury-cream hover:border-luxury-gold hover:text-luxury-gold transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-luxury-cream/25 text-luxury-cream hover:border-luxury-gold hover:text-luxury-gold transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === current ? 'w-8 bg-luxury-gold' : 'w-2 bg-luxury-cream/40'
            }`}
          />
        ))}
      </div>

      {/* Mouse Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 opacity-60">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-luxury-cream/40 p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-2 w-1.5 rounded-full bg-luxury-cream"
          />
        </div>
      </div>

    </section>
  );
}
