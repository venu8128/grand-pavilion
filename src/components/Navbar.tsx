"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, ShoppingBag, Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll shadow/background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy to highlight current active section
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['about', 'signature', 'menu', 'gallery', 'reviews', 'reserve', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [pathname]);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== '/') return; // Will navigate via Link href

    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Our Story', section: 'about', href: '/#about' },
    { label: 'Signature', section: 'signature', href: '/#signature' },
    { label: 'Menu', section: 'menu', href: '/#menu' },
    { label: 'Gallery', section: 'gallery', href: '/#gallery' },
    { label: 'Reviews', section: 'reviews', href: '/#reviews' },
    { label: 'Blog', section: 'blog', href: '/blog' },
    { label: 'Contact', section: 'contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-black/90 dark:bg-luxury-black/95 shadow-lg border-b border-luxury-gold/10 py-3 backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Restaurant Branding */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.25em] text-luxury-gold transition-colors group-hover:text-luxury-lightGold">
            GRAND PAVILION
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.18em] text-luxury-cream/70 dark:text-luxury-cream/70 -mt-0.5">
            INDIA'S LARGEST RESTAURANT
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === '/' ? activeSection === link.section : pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.section)}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-250 ${
                  isActive
                    ? 'text-luxury-gold border-b border-luxury-gold/50 pb-0.5'
                    : 'text-luxury-cream/80 hover:text-luxury-gold'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/15 bg-luxury-dark/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Cart Icon Link */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/15 bg-luxury-dark/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-copper text-[8px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve CTA */}
          <Link
            href="/#reserve"
            onClick={() => handleNavClick('reserve')}
            className="hidden sm:inline-block rounded-md border border-luxury-gold bg-luxury-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-luxury-gold transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-black"
          >
            Book a Table
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/15 bg-luxury-dark/30 text-luxury-gold"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-luxury-black/98 border-t border-luxury-gold/10 py-6 px-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-5 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.section)}
                className="text-sm uppercase tracking-widest font-semibold text-luxury-cream border-b border-luxury-gold/5 pb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="space-y-4 pb-10">
            <Link
              href="/#reserve"
              onClick={() => handleNavClick('reserve')}
              className="block w-full text-center rounded-md border border-luxury-gold bg-luxury-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-luxury-black shadow-lg"
            >
              Book a Table
            </Link>
            <p className="text-center text-[10px] text-luxury-cream/40">
              Poranki, Vijayawada | +91 9177173416
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
