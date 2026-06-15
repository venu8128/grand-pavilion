"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Youtube, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate API call
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-black text-luxury-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            Location & Contact
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Map & Details Column */}
          <div className="space-y-8">
            
            {/* Embedded Google Map */}
            <div className="w-full h-80 rounded-xl overflow-hidden border border-luxury-gold/15 shadow-lg bg-luxury-dark/30">
              <iframe
                title="KOWSHIK Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.0628282361664!2d80.70817341530932!3d16.47231478862985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fabcbf000001%3A0xe543ec682c7d91e!2sPoranki%2C%20Vijayawada%2C%20Andhra%20Pradesh%20521137!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%) brightness(90%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Visual Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="border border-luxury-gold/10 bg-luxury-dark/25 rounded-lg p-5 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-luxury-gold/10 p-2.5 text-luxury-gold">
                  <MapPin size={18} />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Address</h4>
                <p className="text-[11px] text-luxury-cream/70 font-light leading-relaxed">
                  Poranki, Vijayawada,<br />Andhra Pradesh, India
                </p>
              </div>

              <div className="border border-luxury-gold/10 bg-luxury-dark/25 rounded-lg p-5 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-luxury-gold/10 p-2.5 text-luxury-gold">
                  <Phone size={18} />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Direct Line</h4>
                <p className="text-[11px] text-luxury-cream/70 font-light leading-relaxed">
                  +91 9177173416<br />+91 9177173415
                </p>
              </div>

              <div className="border border-luxury-gold/10 bg-luxury-dark/25 rounded-lg p-5 flex flex-col items-center text-center space-y-2">
                <div className="rounded-full bg-luxury-gold/10 p-2.5 text-luxury-gold">
                  <Mail size={18} />
                </div>
                <h4 className="font-serif font-bold text-sm text-white">Inquiries</h4>
                <p className="text-[11px] text-luxury-cream/70 font-light leading-relaxed">
                  Email@gmail.com<br />concierge@kowshik.in
                </p>
              </div>

            </div>

            {/* Social handles */}
            <div className="flex justify-center gap-4 pt-4 border-t border-luxury-gold/10">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-dark/25 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors" aria-label="Facebook Page"><Facebook size={16} /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-dark/25 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors" aria-label="Instagram Profile"><Instagram size={16} /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-dark/25 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors" aria-label="Twitter Profile"><Twitter size={16} /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-dark/25 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors" aria-label="YouTube Channel"><Youtube size={16} /></a>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="border border-luxury-gold/15 bg-luxury-dark/30 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-xl sm:text-2xl text-luxury-gold border-b border-luxury-gold/10 pb-4 mb-4">
                  Send a Message
                </h3>
                
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/35 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/35 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your number"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/35 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How may we assist you today?"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/35 focus:border-luxury-gold/50 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-luxury-gold py-4 text-xs font-bold uppercase tracking-widest text-luxury-black shadow-lg hover:bg-luxury-lightGold transition-colors"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-luxury-gold font-bold">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-luxury-cream/70 max-w-xs mx-auto">
                  Thank you for contacting India's Grand Pavilion. Our hospitality desk will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-6 rounded-lg border border-luxury-gold/30 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
