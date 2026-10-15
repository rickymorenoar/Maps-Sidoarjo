import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

/**
 * Aplikasi Sidoarjo Memory Map.
 * Menyusun semua section dalam satu halaman (single-page) dengan navigasi anchor halus.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      {/* Navbar Sticky: Home | About | Contact */}
      <Navbar />

      {/* Konten Utama */}
      <main className="flex-1">
        <Home />
        <About />
        <Contact />
      </main>

      {/* Footer di dasar halaman, di luar navbar */}
      <Footer />
    </div>
  );
}
