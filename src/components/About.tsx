"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-luxury-black text-luxury-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Story Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
              OUR HERITAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
              The Culinary Canvas
            </h2>
            <div className="h-[1px] w-20 bg-luxury-gold/55" />
            
            <p className="text-base text-luxury-gold italic font-medium leading-relaxed font-serif text-lg">
              "At KOWSHIK, we believe that dining is a sacred ritual—a beautiful union of taste, aroma, and visual elegance."
            </p>
            
            <p className="text-sm sm:text-base text-luxury-cream/80 leading-relaxed font-light">
              Rooted in the diverse heritage of regional Indian cuisines, our curators source rare spices directly from estates in Kerala, Karnataka, and Kashmir. We preserve authentic, slow-cooked flavors while utilizing contemporary culinary techniques to present dishes that challenge your senses and delight your palate.
            </p>
            
            <p className="text-sm sm:text-base text-luxury-cream/80 leading-relaxed font-light">
              Every ingredient is selected at its seasonal peak, cooked with passion, and served in an architectural sanctuary of warm brass, natural teak, and soft ambient lighting. Spanning an expansive estate in Poranki, Vijayawada, we are proud to welcome you to the largest culinary destination in the nation.
            </p>

            <div className="pt-6 border-t border-luxury-gold/10 flex flex-col gap-1">
              <span className="font-serif text-2xl italic text-luxury-gold">Chef Raghavan Iyer</span>
              <span className="text-xs uppercase tracking-widest text-luxury-cream/50">Executive Culinary Director</span>
            </div>
          </motion.div>

          {/* Overlapping Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Background Decorative Gold Frame */}
            <div className="absolute top-8 left-8 w-[85%] h-[85%] border border-luxury-gold/30 rounded-lg translate-x-4 translate-y-4 hidden sm:block z-0" />
            
            {/* Primary Image */}
            <div className="relative z-10 w-full max-w-md rounded-lg overflow-hidden border border-luxury-gold/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                alt="Executive Chef preparing premium dish"
                className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Overlapping secondary detail frame */}
            <div className="absolute -bottom-6 -left-6 z-20 w-44 rounded-lg overflow-hidden border border-luxury-gold/25 shadow-xl hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400"
                alt="Fresh spices preparation details"
                className="w-full h-44 object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
