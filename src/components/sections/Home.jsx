import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MemoryApp } from '../memory/MemoryApp';

/**
 * Section Home: Hero ringkas berkarakter + aplikasi peta ingatan kolektif Sidoarjo.
 * Judul menggunakan efek slide-up mask saat pertama kali dimuat.
 */
export function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Animasi per baris untuk judul hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="home" className="pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Singkat & Berkarakter */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-tambak/10 text-tambak border border-tambak/20 text-xs font-medium tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-tambak"></span>
            <span>Arsip Spasial & Narasi Kolektif</span>
          </div>

          {shouldReduceMotion ? (
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.15] mb-4">
              Setiap sudut tanah Delta menyimpan cerita yang tak boleh pudar.
            </h1>
          ) : (
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.15] mb-4"
            >
              <motion.span variants={lineVariants} className="block">
                Setiap sudut tanah Delta
              </motion.span>
              <motion.span variants={lineVariants} className="block text-clay">
                menyimpan cerita
              </motion.span>
              <motion.span variants={lineVariants} className="block text-ink">
                yang tak boleh pudar.
              </motion.span>
            </motion.h1>
          )}

          <p className="text-sm sm:text-base text-ink/80 leading-relaxed font-sans max-w-2xl">
            Sidoarjo bukan sekadar lintasan penghubung antar kota. Di balik gang-gang sempit, tambak berpayau, dan bentang tanggul, bersemayam memori hidup para penghuninya. Tuliskan ingatan Anda, dan biarkan peta menautkannya ke ruang sejarah.
          </p>
        </div>

        {/* Garis pemisah halus bernuansa kertas bertinta */}
        <div className="w-full h-[1px] bg-line mb-8"></div>

        {/* Aplikasi Peta Ingatan */}
        <MemoryApp />

      </div>
    </section>
  );
}
