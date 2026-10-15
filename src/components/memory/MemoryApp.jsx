import React, { useState } from 'react';
import { MemoryMap } from './MemoryMap';
import { MemoryForm } from './MemoryForm';
import { MemoryList } from './MemoryList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SEED_MEMORIES } from '../../data/seedMemories';
import { STORAGE_KEY_MEMORIES, FOCUS_ZOOM } from '../../lib/constants';

/**
 * MemoryApp mengelola state utama:
 * - Daftar ingatan (disinkronkan dengan localStorage)
 * - Titik/memori aktif yang sedang dipilih
 * - Koordinat flyTo untuk peta Leaflet
 */
export function MemoryApp() {
  const [memories, setMemories] = useLocalStorage(
    STORAGE_KEY_MEMORIES,
    SEED_MEMORIES
  );
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [flyTarget, setFlyTarget] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'form' | 'list'

  const handleSelectMemory = (memory) => {
    setSelectedMemory(memory);
    setFlyTarget({
      lat: memory.location.lat,
      lng: memory.location.lng,
      zoom: FOCUS_ZOOM,
      timestamp: Date.now(),
    });
  };

  const handleAddMemory = (newMemory) => {
    setMemories((prev) => [newMemory, ...prev]);
    setSelectedMemory(newMemory);
    setFlyTarget({
      lat: newMemory.location.lat,
      lng: newMemory.location.lng,
      zoom: FOCUS_ZOOM,
      timestamp: Date.now(),
    });
    // Beralih ke tab arsip untuk melihat pin yang baru saja ditambahkan
    setActiveTab('list');
  };

  return (
    <div className="w-full">
      {/* Kontainer Utama: Mobile tumpuk (peta dulu), Desktop berdampingan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Peta Interaktif */}
        <div className="lg:col-span-7 xl:col-span-8 order-1">
          <div className="sticky top-20">
            <MemoryMap
              memories={memories}
              selectedMemory={selectedMemory}
              flyTarget={flyTarget}
              onSelectMemory={handleSelectMemory}
            />
            <div className="mt-2.5 flex items-center justify-between text-xs text-ink/60 px-1">
              <span>Klik penanda di peta untuk membaca cuplikan ingatan.</span>
              <span className="hidden sm:inline text-tambak font-medium">
                Peta Kertas Delta Sidoarjo
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Panel Samping (Form & Daftar Titik) */}
        <div className="lg:col-span-5 xl:col-span-4 order-2 space-y-4">
          
          {/* Navigasi Tab Samping */}
          <div className="flex items-center p-1 bg-paper border border-line rounded-md">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-clay text-paper shadow-xs'
                  : 'text-ink/70 hover:text-ink hover:bg-black/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Arsip Ingatan ({memories.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`flex-1 py-2 text-xs font-semibold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-clay text-paper shadow-xs'
                  : 'text-ink/70 hover:text-ink hover:bg-black/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Tulis Ingatan Baru</span>
            </button>
          </div>

          {/* Konten Tab Aktif */}
          {activeTab === 'form' ? (
            <MemoryForm onAddMemory={handleAddMemory} />
          ) : (
            <MemoryList
              memories={memories}
              selectedMemory={selectedMemory}
              onSelectMemory={handleSelectMemory}
            />
          )}
        </div>

      </div>
    </div>
  );
}
