"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2500);
  };

  return (
    <footer className="bg-luxury-black text-luxury-cream border-t border-luxury-gold/10 pt-16 pb-8 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Logo & Info column */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col select-none">
              <span className="font-serif text-xl font-bold tracking-[0.25em] text-luxury-gold">
                GRAND PAVILION
              </span>
              <span className="text-[9px] tracking-[0.18em] text-luxury-cream/70 -mt-0.5">
                INDIA'S LARGEST RESTAURANT
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
              "A Taste You'll Never Forget"<br />
              India's largest restaurant setting, featuring a royal multi-cuisine legacy and contemporary culinary craftsmanship.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-md font-semibold text-luxury-gold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li>
                <Link href="/#about" className="text-luxury-cream/80 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  <ChevronRight size={10} className="text-luxury-gold/60" />
                  <span>Our Story</span>
                </Link>
              </li>
              <li>
                <Link href="/#signature" className="text-luxury-cream/80 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  <ChevronRight size={10} className="text-luxury-gold/60" />
                  <span>Signature Specials</span>
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="text-luxury-cream/80 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  <ChevronRight size={10} className="text-luxury-gold/60" />
                  <span>Interactive Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-luxury-cream/80 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  <ChevronRight size={10} className="text-luxury-gold/60" />
                  <span>Visual Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-luxury-cream/80 hover:text-luxury-gold flex items-center gap-1 transition-colors">
                  <ChevronRight size={10} className="text-luxury-gold/60" />
                  <span>Culinary Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-md font-semibold text-luxury-gold uppercase tracking-wider">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-luxury-cream/85">
              <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                <span>Monday - Friday</span>
                <span className="font-medium">09:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                <span>Saturday - Sunday</span>
                <span className="font-medium">09:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-luxury-gold/5 pb-1">
                <span>Final Kitchen Order</span>
                <span className="font-medium text-luxury-gold">09:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-md font-semibold text-luxury-gold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-luxury-cream/70 font-light leading-relaxed">
              Subscribe to receive updates on seasonal recipes, VIP dinner nights, and special culinary offerings.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-luxury-gold/20 bg-luxury-dark/40 py-2 pl-3 pr-9 text-xs text-luxury-cream placeholder-luxury-cream/35 focus:border-luxury-gold/50 focus:outline-none"
                  />
                  <Mail className="absolute right-3 top-2.5 h-3.5 w-3.5 text-luxury-gold/50" />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-luxury-gold py-2 text-[10px] font-bold uppercase tracking-widest text-luxury-black hover:bg-luxury-lightGold transition-colors"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-md p-3 justify-center animate-fade-in">
                <CheckCircle2 size={14} />
                <span>Subscription Confirmed!</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-luxury-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-luxury-cream/40 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} India's Grand Pavilion. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
