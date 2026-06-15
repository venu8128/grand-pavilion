"use client";

import React, { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    cartCount
  } = useCart();

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Cart Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-luxury-gold/15 bg-luxury-black text-luxury-cream shadow-2xl backdrop-blur-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-luxury-gold/10 p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-luxury-gold" />
                <h2 className="font-serif text-xl font-semibold text-luxury-gold">Your Order Basket</h2>
                <span className="rounded-full bg-luxury-gold/10 px-2 py-0.5 text-xs text-luxury-gold">
                  {cartCount} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-luxury-cream/60 transition-colors hover:text-luxury-gold"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-dark/40 text-luxury-gold/60">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-luxury-cream">Basket is empty</h3>
                    <p className="text-sm text-luxury-text-secondary mt-1 max-w-[250px]">
                      Add some exquisite multi-cuisine culinary masterpieces from our interactive menu.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 rounded-full border border-luxury-gold/30 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-luxury-gold/10 pb-4"
                  >
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-md font-semibold text-luxury-cream">{item.name}</h4>
                        <span className="font-semibold text-luxury-gold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-luxury-text-secondary capitalize mt-0.5">{item.category}</p>
                      
                      {/* Quantity & Delete Actions */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2 border border-luxury-gold/30 rounded-md bg-luxury-dark/50 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-luxury-cream/80 hover:text-luxury-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm px-2 font-semibold min-w-[16px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-luxury-cream/80 hover:text-luxury-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-luxury-cream/40 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer calculations & checkout link */}
            {cart.length > 0 && (
              <div className="border-t border-luxury-gold/10 bg-luxury-dark/40 p-5 space-y-4">
                <div className="space-y-2 text-sm text-luxury-cream/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-400">Free</span> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-luxury-gold/80 italic">
                      Add ${(50 - cartSubtotal).toFixed(2)} more to qualify for Free Delivery!
                    </p>
                  )}
                  <div className="flex justify-between border-t border-luxury-gold/10 pt-2 text-base font-bold text-luxury-gold">
                    <span>Total Order</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-luxury-gold px-6 py-3 font-semibold uppercase tracking-widest text-luxury-black transition-colors hover:bg-luxury-lightGold">
                    <span>Checkout Now</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
                
                <p className="text-center text-[10px] text-luxury-cream/50 mt-1">
                  Deliveries are packaged in thermostatic boxes with chefs instructions.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
