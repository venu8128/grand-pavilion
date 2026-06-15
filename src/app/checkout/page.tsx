"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, ShoppingBag, ArrowLeft, CheckCircle2, CreditCard, Home, MapPin, Phone, User, Mail } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

interface DeliveryDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: 'card' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export default function Checkout() {
  const { cart, cartSubtotal, deliveryFee, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Vijayawada',
    zip: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [isPlaced, setIsPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.address) return;

    // Generate Order ID
    const randomId = 'GP-ORDER-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setIsPlaced(true);

    // Explode confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E5C483', '#090A0F', '#FAF8F2']
    });

    // Clear ordering cart
    clearCart();
  };

  if (!mounted) return null;

  return (
    <section className="min-h-screen bg-luxury-black text-luxury-cream pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/#menu" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-luxury-lightGold transition-colors">
            <ArrowLeft size={14} />
            <span>Back to Menu</span>
          </Link>
        </div>

        {!isPlaced ? (
          /* Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Delivery Form (Left 7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSubmit} className="border border-luxury-gold/15 bg-luxury-dark/30 rounded-2xl p-6 sm:p-10 shadow-xl space-y-6">
                <h2 className="font-serif text-2xl font-bold text-luxury-gold border-b border-luxury-gold/10 pb-4 mb-4">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="checkout-name" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                      <User size={12} className="text-luxury-gold" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Gourmet recipient"
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="checkout-phone" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                      <Phone size={12} className="text-luxury-gold" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      id="checkout-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Delivery contact"
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-span-full space-y-2">
                    <label htmlFor="checkout-email" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                      <Mail size={12} className="text-luxury-gold" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      id="checkout-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Receipt email address"
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="col-span-full space-y-2">
                    <label htmlFor="checkout-address" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                      <MapPin size={12} className="text-luxury-gold" />
                      <span>Street Address</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Apartment number, Street details, Poranki"
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label htmlFor="checkout-city" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80 flex items-center gap-1.5">
                      <Home size={12} className="text-luxury-gold" />
                      <span>City</span>
                    </label>
                    <input
                      type="text"
                      id="checkout-city"
                      name="city"
                      required
                      readOnly
                      value={formData.city}
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/35 px-4 py-3 text-sm text-luxury-cream/60 focus:outline-none"
                    />
                  </div>

                  {/* Zip Code */}
                  <div className="space-y-2">
                    <label htmlFor="checkout-zip" className="text-xs font-semibold uppercase tracking-wider text-luxury-cream/80">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="checkout-zip"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="e.g. 521137"
                      className="w-full rounded-lg border border-luxury-gold/15 bg-luxury-black/60 px-4 py-3 text-sm text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold/50 focus:outline-none"
                    />
                  </div>

                </div>

                {/* Payment Option */}
                <div className="space-y-4 border-t border-luxury-gold/10 pt-6">
                  <h3 className="font-serif text-lg font-semibold text-luxury-gold">Payment Option</h3>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="accent-luxury-gold h-4 w-4"
                      />
                      <span>Cash on Delivery (COD)</span>
                    </label>
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="accent-luxury-gold h-4 w-4"
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-luxury-black/50 border border-luxury-gold/10 p-5 rounded-lg animate-fade-in">
                      <div className="sm:col-span-3 space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-cream/60">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            placeholder="4000 1234 5678 9010"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full rounded border border-luxury-gold/15 bg-luxury-black py-2 pl-3 pr-10 text-xs text-luxury-cream focus:border-luxury-gold/40 focus:outline-none"
                          />
                          <CreditCard size={14} className="absolute right-3 top-2.5 text-luxury-gold/50" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-cream/60">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          required
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full rounded border border-luxury-gold/15 bg-luxury-black py-2 px-3 text-xs text-luxury-cream focus:border-luxury-gold/40 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-cream/60">Security CVV</label>
                        <input
                          type="password"
                          name="cardCvv"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          className="w-full rounded border border-luxury-gold/15 bg-luxury-black py-2 px-3 text-xs text-luxury-cream focus:border-luxury-gold/40 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`w-full rounded-lg bg-luxury-gold py-4 text-xs font-bold uppercase tracking-widest text-luxury-black shadow-lg hover:bg-luxury-lightGold transition-colors ${
                    cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Place Delivery Order
                </button>
              </form>
            </div>

            {/* Order Basket Summary (Right 5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-luxury-gold/15 bg-luxury-dark/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center gap-2 border-b border-luxury-gold/10 pb-4">
                  <ShoppingBag size={18} className="text-luxury-gold" />
                  <h3 className="font-serif text-lg font-bold text-luxury-cream">Order Summary</h3>
                </div>

                {/* Items */}
                <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
                  {cart.length === 0 ? (
                    <p className="text-center text-xs text-luxury-cream/50 py-8 italic">
                      Your order basket is empty.
                    </p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs border-b border-luxury-gold/5 pb-2">
                        <div>
                          <p className="font-serif font-bold text-white text-[13px]">{item.name}</p>
                          <p className="text-luxury-cream/50 mt-0.5">Qty: {item.quantity} &times; ${item.price}</p>
                        </div>
                        <span className="font-semibold text-luxury-gold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Pricing calculations */}
                {cart.length > 0 && (
                  <div className="space-y-2.5 text-xs text-luxury-cream/80 border-t border-luxury-gold/10 pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eco-Delivery</span>
                      <span>{deliveryFee === 0 ? <span className="text-green-400 font-medium">Free</span> : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between border-t border-luxury-gold/10 pt-2 text-sm font-bold text-luxury-gold">
                      <span>Total Due</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* Confirmed Receipt Card */
          <div className="mx-auto max-w-xl border border-luxury-gold/25 bg-luxury-dark/50 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold">
              <ShieldCheck size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-luxury-gold font-bold">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-luxury-cream/70">
                Receipt is sent to <span className="font-medium text-white">{formData.email}</span>. Your gourmet dinner is heading your way.
              </p>
            </div>

            {/* Virtual receipt */}
            <div className="border border-luxury-gold/15 bg-luxury-black/80 rounded-xl p-6 text-left space-y-4 font-mono text-xs text-luxury-cream/80 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-green-400 font-sans font-bold">
                <CheckCircle2 size={10} />
                <span>Preparing</span>
              </div>
              
              <div className="border-b border-luxury-gold/10 pb-3 flex justify-between">
                <span className="font-sans font-bold tracking-widest text-luxury-gold text-sm">GRAND PAVILION</span>
                <span>ID: {orderId}</span>
              </div>
              
              <div className="space-y-1 pb-3 border-b border-luxury-gold/5">
                <p><span className="text-luxury-cream/40">DELIVER TO:</span> {formData.name}</p>
                <p><span className="text-luxury-cream/40">ADDRESS:</span> {formData.address}, {formData.city}</p>
                <p><span className="text-luxury-cream/40">PHONE:</span> {formData.phone}</p>
                <p><span className="text-luxury-cream/40">PAYMENT:</span> {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card (Paid)'}</p>
              </div>

              <div className="space-y-1 font-sans text-[11px] text-luxury-cream/70 text-center">
                <span className="block text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">Estimated Arrival: 35-45 Minutes</span>
                <p>For questions or route tracking, call concierge delivery desk at +91 9177173416.</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/" className="rounded-lg bg-luxury-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-luxury-black shadow hover:bg-luxury-lightGold transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
