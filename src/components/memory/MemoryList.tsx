import React, { useState } from 'react';
import { MateriItem } from '../../types/memory';
import { KECAMATAN_LIST } from '../../lib/constants';

export interface MemoryListProps {
  memories?: MateriItem[];
  selectedMemory?: MateriItem | null;
  onSelectMemory: (mem: MateriItem) => void;
  onOpenDetail?: (mem: MateriItem) => void;
}

/**
 * Daftar Materi Pembelajaran per Kecamatan di Kabupaten Sidoarjo.
 */
export const MemoryList: React.FC<MemoryListProps> = ({
  memories = [],
  selectedMemory = null,
  onSelectMemory,
  onOpenDetail,
}) => {
  const [filterKecamatan, setFilterKecamatan] = useState<string>('ALL');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...Array.from(new Set(memories.map((m) => m.category)))];

  const filteredMemories = memories.filter((mem) => {
    const matchKecamatan = filterKecamatan === 'ALL' || mem.kecamatan === filterKecamatan;
    const matchCategory = filterCategory === 'ALL' || mem.category === filterCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      query === '' ||
      mem.title.toLowerCase().includes(query) ||
      mem.content.toLowerCase().includes(query) ||
      mem.kecamatan.toLowerCase().includes(query) ||
      mem.category.toLowerCase().includes(query);

    return matchKecamatan && matchCategory && matchQuery;
  });

  return (
    <div className="bg-[#FAF7F2] border border-line rounded-md p-4 flex flex-col h-full max-h-[620px] shadow-xs">
      
      {/* Header Panel */}
      <div className="pb-3 border-b border-line space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base sm:text-lg font-bold text-ink flex items-center gap-2">
            <span>Daftar Materi Kecamatan</span>
            <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-paper border border-line text-ink/70">
              {filteredMemories.length} / {memories.length}
            </span>
          </h3>
        </div>

        {/* Pencarian Teks */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, topik, atau kecamatan..."
            className="w-full text-xs bg-paper border border-line rounded-md pl-8 pr-3 py-1.5 text-ink placeholder:text-ink/40 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay/30"
          />
          <svg
            className="w-3.5 h-3.5 text-ink/40 absolute left-2.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-ink/40 hover:text-ink p-1 cursor-pointer"
              aria-label="Hapus pencarian"
            >
              &times;
            </button>
          )}
        </div>

        {/* Dropdown Filter Kecamatan */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <select
              value={filterKecamatan}
              onChange={(e) => setFilterKecamatan(e.target.value)}
              className="w-full bg-paper border border-line rounded px-2 py-1 text-xs text-ink focus:outline-none focus:border-clay"
            >
              <option value="ALL">Semua Kecamatan ({KECAMATAN_LIST.length})</option>
              {KECAMATAN_LIST.map((kec) => (
                <option key={kec.name} value={kec.name}>
                  Kec. {kec.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-paper border border-line rounded px-2 py-1 text-xs text-ink focus:outline-none focus:border-clay"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'Semua Kategori' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Daftar Item Materi */}
      <div className="flex-1 overflow-y-auto pt-3 pr-1 space-y-2.5">
        {filteredMemories.length === 0 ? (
          <div className="text-center py-10 px-4 text-xs text-ink/60">
            <p className="italic">Belum ada materi untuk filter atau pencarian ini.</p>
          </div>
        ) : (
          filteredMemories.map((mem) => {
            const isSelected = selectedMemory?.id === mem.id;
            return (
              <div
                key={mem.id}
                className={`w-full p-3 rounded-sm border transition-all ${
                  isSelected
                    ? 'bg-paper border-clay ring-1 ring-clay/40 shadow-xs'
                    : 'bg-paper/70 border-line hover:border-ink/30 hover:bg-paper'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wide text-clay px-1.5 py-0.5 bg-clay/10 rounded-sm">
                    Kec. {mem.kecamatan}
                  </span>
                  <span className="text-[10px] text-tambak font-medium px-1.5 py-0.5 bg-tambak/10 rounded-sm">
                    {mem.category}
                  </span>
                </div>

                {mem.imageUrl && (
                  <div
                    onClick={() => onSelectMemory(mem)}
                    className="w-full h-28 sm:h-32 mb-2 rounded-sm overflow-hidden bg-black/5 relative cursor-pointer group"
                  >
                    <img
                      src={mem.imageUrl}
                      alt={mem.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                      <span className="text-[10px] text-paper font-medium">Klik untuk fokus peta</span>
                    </div>
                  </div>
                )}

                <h4
                  onClick={() => {
                    onSelectMemory(mem);
                    if (onOpenDetail) onOpenDetail(mem);
                  }}
                  className="font-serif font-bold text-sm text-ink mb-1 line-clamp-1 cursor-pointer hover:text-clay transition-colors"
                >
                  {mem.title}
                </h4>

                {/* Koordinat Grafis Sesuai Materi */}
                <div className="mb-1.5 flex flex-wrap items-center gap-1">
                  <span className="text-[10px] font-mono text-clay font-medium bg-[#F5EFE6] px-1.5 py-0.5 rounded border border-line/60">
                    {mem.koordinatText || `Koordinat: ${mem.location?.lat}, ${mem.location?.lng}`}
                  </span>
                </div>

                <p className="text-xs text-ink/75 line-clamp-2 leading-relaxed mb-2">
                  {mem.content}
                </p>

                <div className="text-[10px] text-ink/50 flex justify-between items-center border-t border-line/40 pt-1.5">
                  <button
                    type="button"
                    onClick={() => onSelectMemory(mem)}
                    className="hover:text-ink cursor-pointer underline underline-offset-2"
                  >
                    Fokus Peta
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectMemory(mem);
                      if (onOpenDetail) onOpenDetail(mem);
                    }}
                    className="text-clay font-bold hover:underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Baca Halaman Materi</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
