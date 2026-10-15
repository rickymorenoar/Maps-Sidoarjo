import React, { useState } from 'react';
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
  const [memories] = useLocalStorage<MateriItem[]>(
    STORAGE_KEY_MATERI,
    SEED_MEMORIES
  );
  const [selectedMemory, setSelectedMemory] = useState<MateriItem | null>(null);
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null);

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
              memories={memories}
              selectedMemory={selectedMemory}
              flyTarget={flyTarget}
              onSelectMemory={handleSelectMemory}
              onOpenDetail={onOpenDetail}
            />
            <div className="mt-2.5 flex items-center justify-between text-xs text-ink/60 px-1">
              <span>Klik penanda pada peta untuk langsung membuka halaman materi lengkap.</span>
              <span className="hidden sm:inline text-clay font-medium">
                Peta Terkunci: Wilayah Kab. Sidoarjo
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Daftar Materi per Kecamatan */}
        <div className="lg:col-span-5 xl:col-span-4 order-2">
          <MemoryList
            memories={memories}
            selectedMemory={selectedMemory}
            onSelectMemory={handleSelectMemory}
            onOpenDetail={onOpenDetail}
          />
        </div>

      </div>
    </div>
  );
};
