import React from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import SignatureDishes from '@/components/SignatureDishes'
import InteractiveMenu from '@/components/InteractiveMenu'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import ReservationSection from '@/components/ReservationSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SignatureDishes />
      <InteractiveMenu />
      <Gallery />
      <Reviews />
      <ReservationSection />
      <ContactSection />
    </>
  )
}
