import React, { useState } from 'react';
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

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(['home', 'materi', 'about', 'contact'], 'home');

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const performScroll = () => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        const topOffset = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + (window.pageYOffset || window.scrollY || 0) - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    // Jika sedang di halaman detail materi, kembalikan ke beranda lalu scroll ke target
    if (window.location.hash.startsWith('#/materi/')) {
      window.location.hash = id === 'home' ? '' : `#${id}`;
      setTimeout(performScroll, 80);
      return;
    }

    performScroll();
  };

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 text-ink hover:text-clay transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 rounded-sm cursor-pointer"
        >
          <span className="w-3 h-3 rounded-full bg-clay group-hover:scale-110 transition-transform"></span>
          <span className="font-serif font-bold text-lg tracking-tight">
            Peta Materi Sidoarjo
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
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-clay rounded-full pointer-events-none" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-ink hover:text-clay hover:bg-black/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay cursor-pointer transition-colors"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Floating Overlay) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-paper/98 backdrop-blur-xl border-b border-line shadow-lg px-4 py-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-clay/10 text-clay font-bold'
                    : 'text-ink/80 hover:bg-black/5 hover:text-ink'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-clay' : 'text-ink/60'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
