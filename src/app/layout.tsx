import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTop from '@/components/ScrollToTop'
import CartDrawer from '@/components/CartDrawer'
import FloatingCart from '@/components/FloatingCart'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: "India's Grand Pavilion | India's Largest Culinary Destination",
  description: "Experience the ultimate culinary journey at India's Grand Pavilion in Poranki, Vijayawada. Fine Indian gastronomy, multi-cuisine, cafe, and luxurious dining. Savor 'A Taste You'll Never Forget'.",
  keywords: "India's Grand Pavilion, restaurant Vijayawada, Poranki restaurant, multi-cuisine dining, Indian fine dining, cafe Vijayawada, order food Vijayawada, table reservation Vijayawada",
  openGraph: {
    title: "India's Grand Pavilion | India's Largest Culinary Destination",
    description: "Savor a sensory journey of multi-cuisine wonders, tandoor specials, and desserts in a luxurious setting at Poranki, Vijayawada.",
    url: 'https://indias-grand-pavilion.vercel.app',
    siteName: "India's Grand Pavilion",
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: "India's Grand Pavilion Fine Dining Room",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-luxury-gold selection:text-luxury-black">
        <ThemeProvider>
          <CartProvider>
            {/* Ambient background glows */}
            <div className="ambient-glow glow-1"></div>
            <div className="ambient-glow glow-2"></div>
            
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>

            {/* Global overlays & actions */}
            <CartDrawer />
            <FloatingCart />
            <ChatBot />
            <WhatsAppButton />
            <ScrollToTop />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
