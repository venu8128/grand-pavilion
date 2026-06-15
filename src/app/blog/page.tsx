"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'secrets-of-24-hour-dal',
    title: 'Secrets of the 24-Hour Simmered Dal Suprabath',
    excerpt: 'Explore the ancient, slow-cooked heritage techniques behind our signature dish, which gently simmers overnight on red-hot tandoori coal fires.',
    date: 'June 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    category: 'Kitchen Secrets'
  },
  {
    slug: 'saffron-sourcing-in-kashmir',
    title: 'Saffron Sourcing: From Flower to Fine Dining',
    excerpt: 'Take a sensory journey with our culinary team into the fields of Kashmir to understand how we harvest and source the most expensive spice in the world.',
    date: 'June 08, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800',
    category: 'Our Sourcing'
  },
  {
    slug: 'art-of-tandoor-cooking',
    title: 'Art of the Tandoor: Clay Oven Gastronomy',
    excerpt: 'Delve into the science of baking with traditional clay ovens, and how we manage smoke levels to achieve crisp textures with tender, juicy cores.',
    date: 'May 30, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=800',
    category: 'Culinary Craft'
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-luxury-black text-luxury-cream pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            CULINARY CHRONICLES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            The Recipes & Updates Blog
          </h1>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Search & Filter Row */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, sourcing chronicles, science..."
              className="w-full rounded-md border border-luxury-gold/20 bg-luxury-dark/45 py-3 pl-10 pr-4 text-sm text-luxury-cream placeholder-luxury-gold/45 focus:border-luxury-gold/50 focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-luxury-gold/60" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-xl overflow-hidden border border-luxury-gold/10 bg-luxury-dark/30 hover:border-luxury-gold/30 hover:shadow-2xl transition-all duration-300"
            >
              
              {/* Image box */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 rounded bg-luxury-black/85 border border-luxury-gold/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-luxury-gold backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              {/* Text info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[10px] text-luxury-cream/50 uppercase tracking-wider font-semibold">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-luxury-gold transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-luxury-gold hover:text-luxury-lightGold transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 font-serif text-lg text-luxury-cream/40">
            No matching updates or culinary chronicles found.
          </div>
        )}

      </div>
    </section>
  );
}
