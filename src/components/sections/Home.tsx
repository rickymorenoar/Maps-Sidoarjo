import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../ui/Button';

/**
 * Section Home: Pas satu layar penuh (100% viewport height tanpa terpotong)
 * di perangkat desktop maupun mobile.
 */
export const Home: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const scrollToMateri = () => {
    const el = document.getElementById('materi');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-6 overflow-hidden select-none"
    >
      {/* Background motif kertas halus */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Spacer penyeimbang atas */}
      <div className="w-full shrink-0 h-1 sm:h-2"></div>

      {/* Konten Hero Terpusat Vertikal */}
      <div className="max-w-3xl mx-auto w-full text-center my-auto z-10 flex flex-col items-center">
        
        {/* Badge Pengenal */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tambak/10 text-tambak border border-tambak/25 text-[11px] sm:text-xs font-medium tracking-wide mb-3 sm:mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-tambak animate-pulse"></span>
          <span>Peta Basis Data Materi 18 Kecamatan Sidoarjo</span>
        </div>

        {/* Judul Utama yang proporsional agar muat 1 layar */}
        {shouldReduceMotion ? (
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight mb-3 sm:mb-4">
            Peta Materi Pembelajaran & Arsip Pengetahuan Tiap Kecamatan
          </h1>
        ) : (
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-tight mb-3 sm:mb-4"
          >
            <motion.span variants={lineVariants} className="block">
              Pusat Materi Edukasi &
            </motion.span>
            <motion.span variants={lineVariants} className="block text-clay italic font-normal">
              Arsip Pengetahuan Wilayah
            </motion.span>
            <motion.span variants={lineVariants} className="block text-ink">
              di 18 Kecamatan Sidoarjo.
            </motion.span>
          </motion.h1>
        )}

        {/* Ringkasan Pengantar */}
        <p className="text-xs sm:text-sm md:text-base text-ink/75 leading-relaxed font-sans max-w-xl mx-auto mb-5 sm:mb-6">
          Platform interaktif untuk memetakan, mendokumentasikan, dan mengakses materi pembelajaran per kecamatan—mulai dari sejarah cagar budaya, potensi industri UMKM, hingga ekologi pesisir Delta Sidoarjo.
        </p>

        {/* Tombol Aksi (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={scrollToMateri}
            className="w-full sm:w-auto text-xs sm:text-sm px-6 py-2.5 font-semibold shadow-xs"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span>Jelajahi Peta Materi</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={scrollToAbout}
            className="w-full sm:w-auto text-xs sm:text-sm px-5 py-2.5"
          >
            <span>Tentang Sistem</span>
          </Button>
        </div>

      </div>

      {/* Indikator Scroll Bawah yang pas di dalam layar */}
      <div className="w-full flex flex-col items-center justify-center pb-1 sm:pb-3 z-10 shrink-0">
        <button
          type="button"
          onClick={scrollToMateri}
          className="group flex flex-col items-center gap-1 text-ink/50 hover:text-clay transition-colors cursor-pointer text-xs"
          aria-label="Gulir ke bagian Materi"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium">Buka Materi Peta</span>
          <svg
            className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

    </section>
  );
};
