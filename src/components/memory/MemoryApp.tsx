import React, { useState, useEffect } from 'react';
import { MemoryMap } from './MemoryMap';
import { MemoryList } from './MemoryList';
import { SEED_MEMORIES } from '../../data/seedMemories';
import { FOCUS_ZOOM } from '../../lib/constants';
import { MateriItem, FlyTarget } from '../../types/memory';

export interface MemoryAppProps {
  onOpenDetail?: (materi: MateriItem) => void;
}

/**
 * MemoryApp: Menampilkan peta materi dan daftar materi per kecamatan.
 */
export const MemoryApp: React.FC<MemoryAppProps> = ({ onOpenDetail }) => {
  // Selalu gunakan SEED_MEMORIES terbaru sebagai sumber data kebenaran tunggal
  const activeMemories = SEED_MEMORIES;
  const [selectedMemory, setSelectedMemory] = useState<MateriItem | null>(null);
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null);

  // Bersihkan semua sisa cache lama di browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('sidoarjo_')) {
            window.localStorage.removeItem(key);
          }
        });
      } catch (_) {}
    }
  }, []);

  const handleSelectMemory = (memory: MateriItem) => {
    setSelectedMemory(memory);
    setFlyTarget({
      lat: memory.location.lat,
      lng: memory.location.lng,
      zoom: FOCUS_ZOOM,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Peta Interaktif Terkunci Wilayah Sidoarjo */}
        <div className="lg:col-span-7 xl:col-span-8 order-1">
          <div className="sticky top-20">
            <MemoryMap
              memories={activeMemories}
              selectedMemory={selectedMemory}
              flyTarget={flyTarget}
              onSelectMemory={handleSelectMemory}
              onOpenDetail={onOpenDetail}
            />
            <div className="mt-2.5 flex items-center justify-between text-xs text-ink/60 px-1">
              <span>Klik penanda titik pada peta untuk memunculkan kotak cuplikan materi.</span>
              <span className="hidden sm:inline text-clay font-medium">
                Peta Terkunci: Wilayah Kab. Sidoarjo
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Materi per Kecamatan */}
        <div className="lg:col-span-5 xl:col-span-4 order-2">
          <MemoryList
            memories={activeMemories}
            selectedMemory={selectedMemory}
            onSelectMemory={handleSelectMemory}
            onOpenDetail={onOpenDetail}
          />
        </div>

      </div>
    </div>
  );
};
