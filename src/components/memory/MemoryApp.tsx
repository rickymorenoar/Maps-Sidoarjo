import React, { useState, useEffect } from 'react';
import { MemoryMap } from './MemoryMap';
import { MemoryList } from './MemoryList';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SEED_MEMORIES } from '../../data/seedMemories';
import { STORAGE_KEY_MATERI, FOCUS_ZOOM } from '../../lib/constants';
import { MateriItem, FlyTarget } from '../../types/memory';

export interface MemoryAppProps {
  onOpenDetail?: (materi: MateriItem) => void;
}

/**
 * MemoryApp: Menampilkan peta materi dan daftar materi per kecamatan.
 */
export const MemoryApp: React.FC<MemoryAppProps> = ({ onOpenDetail }) => {
  const [memories, setMemories] = useLocalStorage<MateriItem[]>(
    STORAGE_KEY_MATERI,
    SEED_MEMORIES
  );
  const [selectedMemory, setSelectedMemory] = useState<MateriItem | null>(null);
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null);

  // Pastikan dataset selalu lengkap 18 kecamatan (22 titik materi) dan bersihkan cache lama
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('sidoarjo_memories');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v1');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v2');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v3');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v4');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v5');
      window.localStorage.removeItem('sidoarjo_materi_kecamatan_v6');

      const raw = window.localStorage.getItem(STORAGE_KEY_MATERI);
      if (!raw || JSON.parse(raw).length < SEED_MEMORIES.length) {
        window.localStorage.setItem(STORAGE_KEY_MATERI, JSON.stringify(SEED_MEMORIES));
        setMemories(SEED_MEMORIES);
      }
    }
  }, [setMemories]);

  // Gunakan SEED_MEMORIES jika state lokal belum terbarui
  const activeMemories = memories && memories.length >= SEED_MEMORIES.length ? memories : SEED_MEMORIES;

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
