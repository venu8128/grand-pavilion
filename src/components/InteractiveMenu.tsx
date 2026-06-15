"use client";

import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Leaf, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'starters' | 'mains' | 'sides' | 'desserts' | 'drinks';
  tags: string[];
  isVeg: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  isSignature?: boolean;
}

const menuItems: MenuItem[] = [
  // Starters
  {
    id: 'st1',
    name: 'Truffle Wild Mushroom Galouti',
    price: 24,
    description: 'Minced wild mushroom patties, slow-cooked and infused with black truffle oil, served on mini saffron sheermal bread.',
    category: 'starters',
    tags: ['Veg', 'Gluten Free', 'Signature'],
    isVeg: true,
    isGlutenFree: true,
    isSignature: true,
  },
  {
    id: 'st2',
    name: 'Curry Leaf Soft-Shell Crab',
    price: 28,
    description: 'Crispy soft-shell crab tossed in aromatic gunpowder spice, fresh curry leaves, and lemon zest, with mango mint dip.',
    category: 'starters',
    tags: ['Spicy', 'Seafood'],
    isVeg: false,
    isSpicy: true,
  },
  {
    id: 'st3',
    name: 'Crispy Honey Chilli Lotus Stem',
    price: 18,
    description: 'Thinly sliced lotus root stems tossed in sweet honey, roasted sesame seeds, and house Sichuan chilli oil.',
    category: 'starters',
    tags: ['Veg', 'Spicy'],
    isVeg: true,
    isSpicy: true,
  },
  {
    id: 'st4',
    name: 'Charcoal Smoked Lamb Chops',
    price: 32,
    description: 'Tender lamb chops marinated in Kashmiri red chilli, malt vinegar, and black cumin, roasted in clay tandoor.',
    category: 'starters',
    tags: ['Spicy', 'Chef Special'],
    isVeg: false,
    isSpicy: true,
  },
  
  // Mains
  {
    id: 'mn1',
    name: 'Dal Suprabath (24-Hour)',
    price: 30,
    description: 'Creamy black lentils simmered overnight on a gentle coal fire, finished with churned white butter, cream, and dry fenugreek.',
    category: 'mains',
    tags: ['Veg', 'Signature'],
    isVeg: true,
    isSignature: true,
  },
  {
    id: 'mn2',
    name: 'Saffron Butter Lobster',
    price: 54,
    description: 'Lobster tail poached gently in saffron ghee, served on a bed of spiced parsnip purée, topped with coconut foam.',
    category: 'mains',
    tags: ['Chef Special'],
    isVeg: false,
    isSignature: true,
  },
  {
    id: 'mn3',
    name: 'Coorgi Smoked Pork Belly',
    price: 46,
    description: 'Pork belly slow-braised with dark roasted spices and traditional "Kachampuli" dark vinegar, served with puffed rice crisp.',
    category: 'mains',
    tags: ['Spicy'],
    isVeg: false,
    isSpicy: true,
  },
  {
    id: 'mn4',
    name: 'Slow-Cooked Awadhi Mutton Biryani',
    price: 38,
    description: 'Fragrant basmati rice layered with tender lamb, saffron, rose water, and cardamoms, cooked under seal ("dum").',
    category: 'mains',
    tags: ['Gluten Free'],
    isVeg: false,
    isGlutenFree: true,
  },

  // Breads & Sides
  {
    id: 'sd1',
    name: 'Rosemary & Truffle Naan',
    price: 9,
    description: 'Clay tandoor-baked flatbread brushed with fresh rosemary extract and white truffle oil glaze.',
    category: 'sides',
    tags: ['Veg'],
    isVeg: true,
  },
  {
    id: 'sd2',
    name: 'Blue Cheese Culcha',
    price: 12,
    description: 'Soft flatbread stuffed with Italian Gorgonzola blue cheese, baked in clay tandoor, finished with honey drizzle.',
    category: 'sides',
    tags: ['Veg', 'New'],
    isVeg: true,
  },
  {
    id: 'sd3',
    name: 'Pomegranate & Mint Raita',
    price: 6,
    description: 'Churned yogurt flavored with roasted cumin seeds, fresh mint leaves, and sweet pomegranate pearls.',
    category: 'sides',
    tags: ['Veg', 'Gluten Free'],
    isVeg: true,
    isGlutenFree: true,
  },

  // Desserts
  {
    id: 'ds1',
    name: 'Cardamom Mango Kulfi',
    price: 22,
    description: 'Mango kulfi sphere served over roasted pistachio soil, encapsulated with cardamom-infused saffron foam.',
    category: 'desserts',
    tags: ['Veg'],
    isVeg: true,
  },
  {
    id: 'ds2',
    name: 'Elora Rose Chocolate Dome',
    price: 24,
    description: 'Valrhona white chocolate dome, gulkand mousse core, hot cardamom-spiced chocolate sauce pour-over at the table.',
    category: 'desserts',
    tags: ['Veg', 'Signature'],
    isVeg: true,
    isSignature: true,
  },
  {
    id: 'ds3',
    name: 'Saffron Rabri Pistachio Tart',
    price: 20,
    description: 'Crisp pistachio shell filled with thickened sweet saffron milk ("rabri"), topped with almond slivers and silver foil.',
    category: 'desserts',
    tags: ['Veg', 'New'],
    isVeg: true,
  },

  // Craft Drinks
  {
    id: 'dr1',
    name: 'Spiced Saffron Old Fashioned',
    price: 20,
    description: 'Single barrel bourbon whiskey infused with toasted saffron threads, orange bitters, and smoked cinnamon stick.',
    category: 'drinks',
    tags: ['Alcoholic'],
    isVeg: false,
  },
  {
    id: 'dr2',
    name: 'Tamarind & Ginger Cooler',
    price: 14,
    description: 'Sweet tamarind pulp, freshly pressed ginger juice, sparkling water, mint leaves, and black salt rim.',
    category: 'drinks',
    tags: ['Veg', 'Mocktail'],
    isVeg: true,
  },
  {
    id: 'dr3',
    name: 'Rose Petal Cardamom Lassi',
    price: 10,
    description: 'Creamy yogurt drink blended with organic rose petals, green cardamom powder, and sweet rose syrup.',
    category: 'drinks',
    tags: ['Veg', 'Mocktail'],
    isVeg: true,
  }
];

export default function InteractiveMenu() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [spicyOnly, setSpicyOnly] = useState<boolean>(false);

  const categories = [
    { label: 'All Offerings', value: 'all' },
    { label: 'Starters', value: 'starters' },
    { label: 'Main Course', value: 'mains' },
    { label: 'Breads & Sides', value: 'sides' },
    { label: 'Desserts', value: 'desserts' },
    { label: 'Crafted Drinks', value: 'drinks' },
  ];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSpicy = !spicyOnly || item.isSpicy;

      return matchesCategory && matchesSearch && matchesVeg && matchesSpicy;
    });
  }, [activeCategory, searchQuery, vegOnly, spicyOnly]);

  return (
    <section id="menu" className="py-24 bg-luxury-black text-luxury-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">
            THE CULINARY MAP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.05em] text-luxury-cream">
            The Interactive Menu
          </h2>
          <div className="h-[1px] w-20 bg-luxury-gold/55 mx-auto" />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-luxury-gold/10 pb-8 mb-12">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search culinary delights..."
              className="w-full rounded-md border border-luxury-gold/20 bg-luxury-dark/45 py-2.5 pl-10 pr-4 text-sm text-luxury-cream placeholder-luxury-gold/45 focus:border-luxury-gold/50 focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-luxury-gold/60" />
          </div>

          {/* Quick Dietary toggles */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors ${
                vegOnly
                  ? 'border-green-500/50 bg-green-500/10 text-green-400'
                  : 'border-luxury-gold/20 bg-luxury-dark/30 text-luxury-cream/80 hover:border-luxury-gold/40'
              }`}
            >
              <Leaf size={14} className={vegOnly ? 'text-green-400' : 'text-luxury-gold/60'} />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setSpicyOnly(!spicyOnly)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wider transition-colors ${
                spicyOnly
                  ? 'border-red-500/50 bg-red-500/10 text-red-400'
                  : 'border-luxury-gold/20 bg-luxury-dark/30 text-luxury-cream/80 hover:border-luxury-gold/40'
              }`}
            >
              <Flame size={14} className={spicyOnly ? 'text-red-400' : 'text-luxury-gold/60'} />
              <span>Spicy Only</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-6 scrollbar-none border-b border-luxury-gold/5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                activeCategory === cat.value
                  ? 'bg-luxury-gold text-luxury-black font-bold shadow-md'
                  : 'bg-luxury-dark/50 border border-luxury-gold/10 text-luxury-cream/80 hover:border-luxury-gold/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between p-6 rounded-xl border border-luxury-gold/10 bg-luxury-dark/25 hover:border-luxury-gold/30 hover:bg-luxury-dark/40 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start border-b border-luxury-gold/5 pb-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-luxury-cream group-hover:text-luxury-gold transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.isVeg && <span className="rounded bg-green-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-green-400">Veg</span>}
                        {item.isSpicy && <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-red-400">Spicy</span>}
                        {item.isSignature && <span className="rounded bg-luxury-gold/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-0.5"><Sparkles size={8} />Signature</span>}
                      </div>
                    </div>
                    <span className="font-serif text-lg font-semibold text-luxury-gold">${item.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-luxury-cream/70 font-light mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-luxury-gold/5 flex items-center justify-end">
                  <button
                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, category: item.category })}
                    className="flex items-center gap-1.5 rounded-lg border border-luxury-gold/25 bg-transparent px-4 py-1.8 text-xs font-bold uppercase tracking-wider text-luxury-gold transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-black"
                  >
                    <ShoppingBag size={12} />
                    <span>Add to Order</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center text-luxury-cream/50 font-serif text-lg">
              No matching culinary delights found in this category.
            </div>
          )}
        </div>

        {/* Online Ordering Showcase Section */}
        <div className="mt-20 border border-luxury-gold/15 bg-luxury-dark/30 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-luxury-gold uppercase block">DELIVERED TO YOUR DOOR</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-cream">KOWSHIK at Home</h3>
            <div className="h-[1px] w-16 bg-luxury-gold/50" />
            
            <p className="text-sm text-luxury-cream/80 font-light leading-relaxed">
              Experience the identical standard of luxurious gastronomy in the comfort of your residence. Each deliverable order is placed in custom thermo-insulated containers designed to preserve plating warmth, complete with cooking details and configuration instruction from our Executive Chef.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border border-luxury-gold/10 bg-luxury-black/30 rounded-lg p-4">
                <span className="block text-2xl font-bold text-luxury-gold">30-45</span>
                <span className="text-[10px] text-luxury-cream/50 uppercase tracking-widest mt-1 block">Min Delivery</span>
              </div>
              <div className="border border-luxury-gold/10 bg-luxury-black/30 rounded-lg p-4">
                <span className="block text-2xl font-bold text-luxury-gold">$0</span>
                <span className="text-[10px] text-luxury-cream/50 uppercase tracking-widest mt-1 block">Fee (&gt;$50)</span>
              </div>
              <div className="border border-luxury-gold/10 bg-luxury-black/30 rounded-lg p-4">
                <span className="block text-2xl font-bold text-green-400">100%</span>
                <span className="text-[10px] text-luxury-cream/50 uppercase tracking-widest mt-1 block">Eco Boxes</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-luxury-gold/10 rounded-xl filter blur-xl opacity-20" />
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
              alt="Thermo-regulated packaging delivery presentation"
              className="rounded-xl border border-luxury-gold/10 shadow-xl relative z-10 w-full max-w-sm h-72 object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
