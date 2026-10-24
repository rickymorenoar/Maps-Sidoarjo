import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'materi',
    label: 'Materi',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const SECTION_IDS = ['home', 'materi', 'about', 'contact'];

// Animasi muncul berurutan satu per satu (Stagger Waterfall) khusus mobile navbar
const mobileItemVariants = {
  hidden: {
    opacity: 0,
    x: -24,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: 0.05 + i * 0.06,
      type: 'spring',
      stiffness: 340,
      damping: 24,
      mass: 0.8,
    },
  }),
};

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS, 'home');

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Lepas fokus agar tidak ada touch/focus lock di mobile
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const scrollToSection = (targetId: string) => {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
          window.history.pushState(null, '', window.location.pathname);
        } catch (_) {}
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 64;
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const elementTop = element.getBoundingClientRect().top + currentScrollY;
        // Pendaratan presisi tepat di batas paling atas section di bawah navbar
        const targetScrollTop = Math.max(0, Math.round(elementTop - headerHeight));

        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });

        try {
          window.history.pushState(null, '', `#${targetId}`);
        } catch (_) {}
      }
    };

    // Jika sedang di halaman detail materi, kembali ke beranda lalu scroll begitu halaman utama siap
    if (window.location.hash.startsWith('#/materi/')) {
      window.location.hash = id === 'home' ? '' : `#${id}`;

      let attempts = 0;
      const checkTimer = setInterval(() => {
        attempts++;
        const targetElement = id === 'home' ? document.getElementById('home') : document.getElementById(id);
        if (targetElement) {
          clearInterval(checkTimer);
          scrollToSection(id);
        } else if (attempts >= 30) {
          clearInterval(checkTimer);
          scrollToSection(id);
        }
      }, 20);
      return;
    }

    // Eksekusi scroll langsung
    scrollToSection(id);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] bg-paper/95 backdrop-blur-md border-b border-line shadow-xs transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Foto Logo Sekolah */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 text-ink hover:text-clay transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 rounded-sm cursor-pointer py-1"
          >
            <img
              src="/logo.webp"
              alt="Logo Sekolah"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-md group-hover:scale-105 transition-transform shrink-0 drop-shadow-xs"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/logo-sekolah.png';
              }}
            />
            <span className="font-serif font-bold text-lg tracking-tight">
              Sidoarjo Memory Map
            </span>
          </a>

          {/* Desktop Nav: Home | Materi | About | Contact */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative py-1 text-sm font-medium transition-colors cursor-pointer select-none flex items-center gap-1.5 ${
                    isActive
                      ? 'text-clay font-semibold'
                      : 'text-ink/75 hover:text-ink'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'text-clay' : 'text-ink/50'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-clay rounded-full pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle Button dengan Efek Animasi */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-ink hover:text-clay hover:bg-black/5 active:scale-95 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay cursor-pointer transition-all duration-200"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative pointer-events-none">
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-clay' : ''
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-all duration-200 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-clay' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown: Melayang / Overlay menimpa elemen lain tanpa stuck */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="md:hidden absolute top-full left-0 right-0 w-full bg-paper/98 backdrop-blur-xl border-b border-line shadow-2xl z-[100]"
            >
              <div className="px-4 py-3 space-y-1.5">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={mobileItemVariants}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer select-none ${
                          isActive
                            ? 'bg-clay/15 text-clay font-bold shadow-xs translate-x-1'
                            : 'text-ink/80 hover:bg-black/5 hover:text-ink active:scale-[0.98]'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`p-1.5 rounded-md transition-colors ${
                            isActive ? 'bg-clay text-paper shadow-xs' : 'bg-black/5 text-ink/70'
                          }`}>
                            {item.icon}
                          </span>
                          <span className="text-base tracking-tight">{item.label}</span>
                        </div>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop semi-transparan saat menu mobile aktif (klik luar untuk tutup) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-[90] cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};
