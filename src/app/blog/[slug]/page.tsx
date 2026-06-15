"use client";

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Re-import database from sibling
interface PostDetail {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  introduction: string;
  bodyParagraphs: string[];
}

const detailedPosts: Record<string, PostDetail> = {
  'secrets-of-24-hour-dal': {
    title: 'Secrets of the 24-Hour Simmered Dal Suprabath',
    category: 'Kitchen Secrets',
    date: 'June 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
    author: 'Chef Raghavan Iyer',
    introduction: 'At the heart of the KOWSHIK menu sits our most prized creation: Dal Suprabath. This simple dish of black lentils requires a tedious 24-hour slow-cooking ritual that preserves legacy preparation styles dating back centuries.',
    bodyParagraphs: [
      "The secret lies in the quality of the legumes and the coal fire. We start with premium whole black lentils (Urad Dal), sorting each grain by hand. They are soaked for precisely eight hours before entering custom copper pots that promote even heat distribution.",
      "The real magic begins at twilight. The lentils are placed on our custom-built clay ovens, fueled by slow-burning tandoori coal embers. Unlike modern gas ranges that boil lentils aggressively, the soft, indirect heat of charcoal embers allows the lentils to break down over twelve hours without losing their texture.",
      "As dawn breaks, our chefs perform the 'tadka'—tempering. Freshly churned white butter, cream, smoked tomatoes, Kashmiri red chilli powder, and dried fenugreek leaves (kasuri methi) are folded in. The dal then simmers for another eight hours, absorbing the rich fats and smoked spices.",
      "The result is a texture so velvety and rich that it feels like silk on the palate. We serve it with a garnish of homemade butter and ginger juliennes. For the full experience, we recommend pairing it with our fresh, tandoor-baked Rosemary & Truffle Naan."
    ]
  },
  'saffron-sourcing-in-kashmir': {
    title: 'Saffron Sourcing: From Flower to Fine Dining',
    category: 'Our Sourcing',
    date: 'June 08, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200',
    author: 'Chef Raghavan Iyer',
    introduction: 'Saffron, known as the red gold of Kashmir, is the soul of several signature dishes at KOWSHIK. Let us explore the rigorous harvesting journey this delicate spice undertakes before gracing our recipes.',
    bodyParagraphs: [
      "Our culinary team travels to Pampore, Kashmir—widely regarded as the saffron capital of India. Pampore's unique soil, high elevation, and dry autumn breezes create the perfect conditions for Crocus Sativus, the purple flowers that contain the precious red stigmas.",
      "Harvesting is a race against time and nature. The flowers bloom for only two weeks in late autumn. They must be plucked by hand at sunrise, before the petals open too wide and the morning sun dries out the aromatic oils in the stigmas. It takes roughly 75,000 flowers to produce just one single pound of high-grade saffron.",
      "Once plucked, the red stigmas are carefully separated from the purple petals. Our suppliers dry them over slow, indirect heat to lock in the saffron's signature chemical compounds: crocin (which gives the bright gold color), picrocrocin (which yields the bittersweet taste), and safranal (the source of the rich honey-like aroma).",
      "We source our saffron strands whole to prevent adulteration. At KOWSHIK, we use this red gold to poach our Saffron Butter Lobster tails, encapsulate our Cardamom Mango Kulfi, and flavor our house Rose Petal Cardamom Lassi, ensuring that each bite carries the authentic, sun-dried essence of Kashmir."
    ]
  },
  'art-of-tandoor-cooking': {
    title: 'Art of the Tandoor: Clay Oven Gastronomy',
    category: 'Culinary Craft',
    date: 'May 30, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=1200',
    author: 'Chef Raghavan Iyer',
    introduction: 'The tandoor, a cylindrical clay oven, is a pillar of traditional Indian cooking. At KOWSHIK, we combine this centuries-old clay-baking heritage with modern gastronomy to achieve absolute perfection.',
    bodyParagraphs: [
      "A tandoor is designed to cook food using three heat directions simultaneously: convection heat from the charcoal at the base, direct radiation from the clay walls, and conduction from the iron skewers holding the meats. This unique setup locks in juices while crisping the outer skin.",
      "Our custom clay ovens are insulated with thick layers of sheep's wool, mud, and sand, allowing them to maintain an inside temperature of up to 480°C (900°F). Maintaining this heat distribution requires high skill, as the chefs must know exactly where to place each skewer inside the clay pit.",
      "When we bake our flatbreads, like the Blue Cheese Culcha, they are slapped directly onto the scorching clay walls. The moisture in the dough instantly turns to steam, causing the bread to puff up. The hot clay caramelizes the outer starches, creating those beautiful charred spots that carry the smoke flavor.",
      "For signature dishes like our Deconstructed Paneer Mille-Feuille, we sear the paneer skewers inside the tandoor for just minutes, keeping the core soft and moist while wrapping the outside in a delicate, smoky crust. This interplay of heat, clay, and smoke is what makes tandoor gastronomy an irreplaceable art form."
    ]
  }
};

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = detailedPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-luxury-black text-luxury-cream pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-luxury-lightGold transition-colors">
            <ArrowLeft size={14} />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Container */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header segment */}
          <div className="space-y-4">
            <span className="rounded bg-luxury-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-luxury-gold border border-luxury-gold/25 inline-block">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs text-luxury-cream/50 uppercase tracking-wider font-semibold border-y border-luxury-gold/10 py-3">
              <span className="flex items-center gap-1.5"><User size={12} className="text-luxury-gold" /> By {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-luxury-gold" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-luxury-gold" /> {post.readTime}</span>
            </div>
          </div>

          {/* Big Featured Image */}
          <div className="w-full h-[400px] overflow-hidden rounded-2xl border border-luxury-gold/15 shadow-xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="space-y-6 text-sm sm:text-base text-luxury-cream/85 leading-relaxed font-light font-sans max-w-3xl mx-auto">
            <p className="font-serif text-lg md:text-xl text-luxury-gold italic leading-relaxed border-l-2 border-luxury-gold pl-4 font-normal">
              {post.introduction}
            </p>
            
            {post.bodyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Footer separator */}
          <div className="border-t border-luxury-gold/15 pt-8 flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-dark text-xs font-bold text-luxury-gold">
                K
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">KOWSHIK</h4>
                <span className="text-[10px] uppercase text-luxury-cream/40 tracking-wider">Poranki, Vijayawada</span>
              </div>
            </div>
            
            <Link
              href="/blog"
              className="rounded-lg border border-luxury-gold/30 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
            >
              More Articles
            </Link>
          </div>

        </motion.article>

      </div>
    </section>
  );
}
