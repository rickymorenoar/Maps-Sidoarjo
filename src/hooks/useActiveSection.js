import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mendeteksi section mana yang sedang aktif di viewport menggunakan IntersectionObserver.
 * 
 * @param {string[]} sectionIds Daftar ID elemen section (contoh: ['home', 'about', 'contact'])
 * @param {string} initialSection ID awal yang aktif
 * @returns {string} ID section yang sedang aktif
 */
export function useActiveSection(sectionIds, initialSection = 'home') {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Pilih section dengan intersection ratio terbesar di viewport
        let highestRatio = -1;
        let mostVisibleId = '';

        visibleSections.forEach((ratio, id) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6, 0.8],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
