import React from 'react';
import { Reveal } from '../ui/Reveal';
import { MemoryApp } from '../memory/MemoryApp';
import { MateriItem } from '../../types/memory';

export interface MateriProps {
  onOpenDetail?: (materi: MateriItem) => void;
}

/**
 * Section Materi: Halaman peta materi pembelajaran dan data per kecamatan di Sidoarjo.
 */
export const Materi: React.FC<MateriProps> = ({ onOpenDetail }) => {
  return (
    <section id="materi" className="py-16 md:py-24 border-t border-line bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section Materi */}
        <div className="max-w-3xl mb-8 md:mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-tambak/10 text-tambak border border-tambak/20 text-xs font-medium tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-tambak"></span>
              <span>Basis Data Materi Wilayah Sidoarjo</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-2.5">
              Peta Materi Edukasi 18 Kecamatan Sidoarjo
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-ink/75 leading-relaxed font-sans">
              Peta dikunci khusus untuk wilayah Kabupaten Sidoarjo. Klik penanda di peta atau item pada daftar di samping untuk membuka halaman materi lengkap.
            </p>
          </Reveal>
        </div>

        {/* Aplikasi Peta & Panel Daftar Materi */}
        <MemoryApp onOpenDetail={onOpenDetail} />

      </div>
    </section>
  );
};
