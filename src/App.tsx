import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Home } from './components/sections/Home';
import { Materi } from './components/sections/Materi';
import { MateriDetail } from './components/sections/MateriDetail';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { MateriItem } from './types/memory';
import { SEED_MEMORIES } from './data/seedMemories';

export default function App(): React.ReactElement {
  const [selectedMateriDetail, setSelectedMateriDetail] = useState<MateriItem | null>(null);

  // Navigasi URL hash untuk mendukung page detail materi & tombol back browser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/materi/')) {
        const id = hash.replace('#/materi/', '');
        const found = SEED_MEMORIES.find((m) => m.id === id);
        if (found) {
          setSelectedMateriDetail(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (!hash.startsWith('#/materi/')) {
        setSelectedMateriDetail(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleOpenDetail = (materi: MateriItem) => {
    setSelectedMateriDetail(materi);
    window.location.hash = `#/materi/${materi.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMap = () => {
    setSelectedMateriDetail(null);
    window.location.hash = '#materi';
    setTimeout(() => {
      const el = document.getElementById('materi');
      if (el) {
        const topOffset = 64;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans">
      <Navbar />

      <main className="flex-1">
        {selectedMateriDetail ? (
          /* Halaman Detail Materi Lengkap */
          <MateriDetail
            materi={selectedMateriDetail}
            onBack={handleBackToMap}
            onSelectOtherMateri={handleOpenDetail}
            allMemories={SEED_MEMORIES}
          />
        ) : (
          /* Halaman Utama: Home | Materi (Peta Terkunci Sidoarjo) | About | Contact */
          <>
            <Home />
            <Materi onOpenDetail={handleOpenDetail} />
            <About />
            <Contact />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
