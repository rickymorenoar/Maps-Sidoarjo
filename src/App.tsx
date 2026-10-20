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

import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEY_MATERI } from './lib/constants';

export default function App(): React.ReactElement {
  const [memories] = useLocalStorage<MateriItem[]>(STORAGE_KEY_MATERI, SEED_MEMORIES);
  const activeMemories = memories && memories.length >= SEED_MEMORIES.length ? memories : SEED_MEMORIES;
  const [selectedMateriDetail, setSelectedMateriDetail] = useState<MateriItem | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/materi/')) {
        const id = hash.replace('#/materi/', '');
        const found = activeMemories.find((m) => m.id === id) || SEED_MEMORIES.find((m) => m.id === id);
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
  }, [activeMemories]);

  const handleOpenDetail = (materi: MateriItem) => {
    setSelectedMateriDetail(materi);
    window.location.hash = `#/materi/${materi.id}`;
    window.scrollTo(0, 0);
  };

  const handleBackToMap = () => {
    setSelectedMateriDetail(null);
    window.location.hash = '#materi';
    setTimeout(() => {
      const el = document.getElementById('materi');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            allMemories={memories}
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
