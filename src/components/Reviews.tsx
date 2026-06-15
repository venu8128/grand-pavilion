"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  content: string;
  initials: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Vijayawada',
    rating: 5,
    content: "A truly royal dining experience. The Dal Suprabath is cookery art, and the atmosphere in Poranki is unmatched. Spanning such an expansive footprint, it is indeed India's largest and most grand restaurant!",
    initials: 'RK'
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    location: 'Guntur',
    rating: 5,
    content: "The Saffron Butter Lobster tail was poached to absolute perfection. The online reservation desk helped me book a family table in seconds, and the service was incredibly warm and sophisticated.",
    initials: 'SR'
  },
  {
    id: 3,
    name: 'Ananya Sen',
    location: 'Hyderabad',
    rating: 5,
    content: "A spectacular culinary sanctuary. Elegant gold-accented designs, premium hospitality, and the deconstructed paneer mille-feuille is out of this world. Highly recommended for special fine dining.",
    initials: 'AS'
  }
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-24 bg-luxury-dark text-luxury-cream overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 text-center">
        
        {/* Section Header */}
        <div className="max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            Voices of Gastronomy
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Carousel Frame */}
        <div className="relative border border-luxury-gold/15 bg-luxury-black/40 rounded-2xl p-8 md:p-12 shadow-xl backdrop-blur-md">
          
          <div className="absolute top-6 left-6 text-luxury-gold/20">
            <Quote size={48} className="fill-current" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 flex flex-col items-center"
            >
              
              {/* Star Ratings */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: reviews[current].rating }).map((_, idx) => (
                  <Star key={idx} size={16} className="text-luxury-gold fill-luxury-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg md:text-xl font-serif italic font-light text-luxury-cream/90 leading-relaxed max-w-2xl">
                "{reviews[current].content}"
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-black text-sm font-bold text-luxury-gold">
                  {reviews[current].initials}
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-md font-semibold text-white">
                    {reviews[current].name}
                  </h4>
                  <span className="text-xs text-luxury-cream/50">
                    {reviews[current].location}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-luxury-gold/15 p-2 bg-luxury-black hover:bg-luxury-gold hover:text-luxury-black transition-colors hidden sm:block"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next Review"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-luxury-gold/15 p-2 bg-luxury-black hover:bg-luxury-gold hover:text-luxury-black transition-colors hidden sm:block"
          >
            <ChevronRight size={16} />
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === current ? 'w-6 bg-luxury-gold' : 'w-1.5 bg-luxury-cream/35'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
