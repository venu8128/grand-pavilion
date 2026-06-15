"use client";

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function FloatingCart() {
  const { cartCount, setIsCartOpen, isCartOpen } = useCart();

  return (
    <AnimatePresence>
      {cartCount > 0 && !isCartOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          aria-label="View Order Cart"
          className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-black text-luxury-gold shadow-2xl backdrop-blur-md transition-colors hover:bg-luxury-gold hover:text-luxury-black focus:outline-none focus:ring-2 focus:ring-luxury-gold"
        >
          <span className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-luxury-copper text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
