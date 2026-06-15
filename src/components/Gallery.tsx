"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  url: string;
  caption: string;
  size: 'small' | 'medium' | 'large';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    caption: 'Our Grand Teak Dining Sanctuary',
    size: 'large',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    caption: "Chef's Clay Oven Kebabs",
    size: 'small',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=800',
    caption: 'Saffron Poached Lobster Tail',
    size: 'medium',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1585938338392-50a59999354e?auto=format&fit=crop&q=80&w=800',
    caption: 'Tandoor cottage cheese Mille-Feuille',
    size: 'medium',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800',
    caption: 'Cardamom Infused Mango Kulfi Dome',
    size: 'small',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    caption: 'Spiced Saffron Old Fashioned Crafting',
    size: 'large',
  }
];

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Close lightbox on Escape, navigate with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
  };

  return (
    <section id="gallery" className="py-24 bg-luxury-black text-luxury-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            VISUAL SANCTUARY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            Our Gallery
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveIdx(index)}
              className="relative overflow-hidden rounded-xl border border-luxury-gold/10 bg-luxury-dark/30 cursor-zoom-in group break-inside-avoid"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px]"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="rounded-full bg-luxury-gold/25 p-2.5 text-luxury-gold">
                    <ZoomIn size={16} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-luxury-gold uppercase block font-bold mb-1">
                    India's Grand Pavilion
                  </span>
                  <h3 className="font-serif text-lg font-medium text-white">{item.caption}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
            >
              
              {/* Close & Header actions */}
              <div className="absolute top-6 left-0 w-full px-6 flex justify-between items-center text-luxury-cream z-10">
                <span className="font-serif tracking-widest text-xs uppercase text-luxury-gold">
                  {activeIdx + 1} / {galleryItems.length}
                </span>
                <button
                  onClick={() => setActiveIdx(null)}
                  className="rounded-full border border-luxury-cream/15 p-2 bg-luxury-dark/50 hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-luxury-cream/15 p-3 bg-luxury-dark/40 hover:border-luxury-gold hover:text-luxury-gold transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full border border-luxury-cream/15 p-3 bg-luxury-dark/40 hover:border-luxury-gold hover:text-luxury-gold transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Image Frame */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl max-h-[70vh] flex items-center justify-center overflow-hidden"
              >
                <img
                  src={galleryItems[activeIdx].url}
                  alt={galleryItems[activeIdx].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded border border-luxury-gold/10"
                />
              </motion.div>

              {/* Caption Footer */}
              <div className="text-center mt-6 max-w-lg">
                <p className="font-serif text-lg md:text-xl text-white font-medium">
                  {galleryItems[activeIdx].caption}
                </p>
                <p className="text-[10px] text-luxury-gold uppercase tracking-widest mt-1">
                  Vijayawada Poranki
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
