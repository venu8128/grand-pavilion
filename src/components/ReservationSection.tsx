"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User, ShieldCheck, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  requests: string;
}

export default function ReservationSection() {
  const [formData, setFormData] = useState<BookingDetails>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '07:00 PM',
    guests: 2,
    requests: ''
  });
  
  const [todayDate, setTodayDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  const timeSlots = [
    '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM',
    '05:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM',
    '08:30 PM', '09:00 PM', '09:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantity = (action: 'inc' | 'dec') => {
    setFormData((prev) => {
      const current = prev.guests;
      if (action === 'dec' && current > 1) return { ...prev, guests: current - 1 };
      if (action === 'inc' && current < 20) return { ...prev, guests: current + 1 };
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    // Generate Booking ID
    const randomId = 'GP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setIsSubmitted(true);

    // Trigger luxury confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E5C483', '#090A0F', '#FAF8F2']
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: todayDate,
      time: '07:00 PM',
      guests: 2,
      requests: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="reserve" className="py-24 bg-luxury-black text-luxury-cream relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            SACRED RITUAL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            Book a Table
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Content Frame */}
        <div className="mx-auto max-w-3xl">
          {!isSubmitted ? (
            /* Booking Form */
            <form
              onSubmit={handleSubmit}
              className="border border-luxury-gold/15 bg-luxury-dark/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-6"
            >
              <h3 className="font-serif text-xl sm:text-2xl text-center text-luxury-gold mb-4">
                Secure Your Culinary Sanctuary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <User size={12} className="text-luxury-gold" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <Phone size={12} className="text-luxury-gold" />
                    <span>Contact Number</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your number"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <Mail size={12} className="text-luxury-gold" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <Users size={12} className="text-luxury-gold" />
                    <span>Guests</span>
                  </label>
                  <div className="flex items-center justify-between rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleQuantity('dec')}
                      className="text-luxury-gold hover:text-luxury-cream transition-colors text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{formData.guests} Guest{formData.guests > 1 && 's'}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantity('inc')}
                      className="text-luxury-gold hover:text-luxury-cream transition-colors text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <Calendar size={12} className="text-luxury-gold" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={todayDate}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream focus:border-luxury-gold/50 focus:outline-none"
                  />
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <label htmlFor="time" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                    <Clock size={12} className="text-luxury-gold" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream focus:border-luxury-gold/50 focus:outline-none appearance-none"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-luxury-black text-luxury-cream">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label htmlFor="requests" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                  Special requests & Dietary notes
                </label>
                <textarea
                  id="requests"
                  name="requests"
                  rows={3}
                  value={formData.requests}
                  onChange={handleInputChange}
                  placeholder="e.g. Birthday setup, vegan adjustments, window table preference..."
                  className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-luxury-gold py-4 text-xs font-bold uppercase tracking-widest text-luxury-black shadow-lg hover:bg-luxury-lightGold transition-colors"
              >
                Confirm Table Booking
              </button>

              <p className="text-[10px] text-center text-luxury-cream/50">
                For groups larger than 20, kindly contact our VIP Desk at +91 9177173416.
              </p>
            </form>
          ) : (
            /* Success Confirmation Card */
            <div className="border border-luxury-gold/25 bg-luxury-dark/60 rounded-2xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden animate-fade-in">
              
              <div className="absolute top-0 right-0 p-4">
                <button
                  onClick={handleReset}
                  className="text-luxury-cream/40 hover:text-luxury-gold transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success Badge */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold animate-bounce">
                <ShieldCheck size={36} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-luxury-gold font-bold">
                  Reservation Confirmed!
                </h3>
                <p className="text-sm text-luxury-cream/70">
                  A verification confirmation receipt has been sent to <span className="font-medium text-white">{formData.email}</span>.
                </p>
              </div>

              {/* Digital Booking ticket info */}
              <div className="border border-luxury-gold/15 bg-luxury-black/70 rounded-xl p-6 text-left max-w-md mx-auto space-y-4 font-mono text-xs text-luxury-cream/80 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-luxury-gold/80 uppercase font-sans font-bold">
                  <Sparkles size={10} />
                  <span>Confirmed</span>
                </div>
                
                <div className="border-b border-luxury-gold/10 pb-3 flex justify-between">
                  <span className="font-sans font-bold tracking-widest text-luxury-gold text-sm">GRAND PAVILION</span>
                  <span>ID: {bookingId}</span>
                </div>
                
                <div className="space-y-2">
                  <p><span className="text-luxury-cream/40">GUEST:</span> {formData.name}</p>
                  <p><span className="text-luxury-cream/40">CONTACT:</span> {formData.phone}</p>
                  <p><span className="text-luxury-cream/40">DATE:</span> {formData.date}</p>
                  <p><span className="text-luxury-cream/40">TIME SLOT:</span> {formData.time}</p>
                  <p><span className="text-luxury-cream/40">CAPACITY:</span> {formData.guests} Guests</p>
                  {formData.requests && (
                    <p className="truncate"><span className="text-luxury-cream/40">NOTE:</span> {formData.requests}</p>
                  )}
                </div>

                <div className="border-t border-luxury-gold/10 pt-3 text-[10px] text-luxury-cream/40 text-center font-sans">
                  Poranki, Vijayawada | Present this ticket to the host.
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="rounded-lg border border-luxury-gold/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
