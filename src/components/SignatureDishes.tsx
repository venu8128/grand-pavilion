"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface SignatureDish {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge: string;
  category: string;
}

const signatureDishes: SignatureDish[] = [
  {
    id: 'sig1',
    name: 'Saffron Butter Lobster',
    price: 54,
    description: 'Fresh lobster tail poached gently in saffron-infused ghee, served over spiced parsnip purée and topped with a delicate coconut-lime foam.',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=600',
    badge: 'Signature',
    category: 'mains'
  },
  {
    id: 'sig2',
    name: 'Deconstructed Paneer Mille-Feuille',
    price: 38,
    description: 'Crispy tandoori spinach sheets layered with charcoal-smoked cottage cheese, heirloom tomato chutney, and finished with a 24k gold leaf glaze.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
    badge: 'Award Winner',
    category: 'starters'
  },
  {
    id: 'sig3',
    name: 'Cardamom Mango Kulfi',
    price: 22,
    description: 'Rich cardamom-infused mango kulfi sphere served on a bed of roasted pistachio soil, encapsulated inside a caramelized saffron sugar dome.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    badge: 'Dessert Art',
    category: 'desserts'
  }
];

export default function SignatureDishes() {
  const { addToCart } = useCart();

  return (
    <section id="signature" className="py-24 bg-luxury-dark text-luxury-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            THE CHEF'S SELECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            Signature Masterpieces
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Masterpieces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col rounded-xl overflow-hidden border border-luxury-gold/10 bg-luxury-black transition-all duration-300 hover:border-luxury-gold/30 hover:shadow-2xl"
            >
              
              {/* Image & Badge Wrapper */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent" />
                
                {/* Gold Luxury Badge */}
                <div className="absolute top-4 left-4 rounded-md border border-luxury-gold/30 bg-luxury-black/80 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-luxury-gold backdrop-blur-sm flex items-center gap-1">
                  <Star size={10} className="fill-luxury-gold text-luxury-gold" />
                  <span>{dish.badge}</span>
                </div>

                {/* Price tag badge overlay */}
                <div className="absolute bottom-4 right-4 rounded-md bg-luxury-gold px-3 py-1.5 text-xs font-bold text-luxury-black">
                  ${dish.price}
                </div>
              </div>

              {/* Info Content */}
              <div className="flex-grow p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-luxury-cream/70 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <button
                  onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, category: dish.category })}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-luxury-gold/30 bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-luxury-gold transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-black"
                >
                  <ShoppingBag size={14} />
                  <span>Add to Order</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
