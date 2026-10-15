import React, { useState } from 'react';

/**
 * Daftar cerita memori warga yang telah disematkan di peta.
 * Dirender murni dari state React, mendukung pemilihan titik dan pencarian/filter.
 */
export function MemoryList({
  memories = [],
  selectedMemory = null,
  onSelectMemory,
}) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Kategori unik yang ada di memori
  const categories = ['ALL', ...Array.from(new Set(memories.map((m) => m.category)))];

  const filteredMemories = memories.filter((mem) => {
    const matchCategory = filterCategory === 'ALL' || mem.category === filterCategory;
    const matchQuery =
      searchQuery.trim() === '' ||
      mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.location.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="bg-[#FAF7F2] border border-line rounded-md p-4 flex flex-col h-full max-h-[580px] shadow-xs">
      <div className="pb-3 border-b border-line">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
            <span>Arsip Ingatan Kolektif</span>
            <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-paper border border-line text-ink/70">
              {memories.length}
            </span>
          </h3>
        </div>

        {/* Kolom pencarian */}
        <div className="relative mb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari lokasi, candi, atau kata..."
            className="w-full text-xs bg-paper border border-line rounded-md pl-8 pr-3 py-1.5 text-ink placeholder:text-ink/40 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay/30"
          />
          <svg
            className="w-3.5 h-3.5 text-ink/40 absolute left-2.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
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

        {/* Filter Kategori Horizontal */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          {categories.map((cat) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-sm border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-clay text-paper border-clay font-medium'
                    : 'bg-paper text-ink/70 border-line hover:border-ink/30 hover:text-ink'
                }`}
              >
                {cat === 'ALL' ? 'Semua' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Item Scrollable */}
      <div className="flex-1 overflow-y-auto pt-3 pr-1 space-y-2.5">
        {filteredMemories.length === 0 ? (
          <div className="text-center py-10 px-4 text-xs text-ink/60">
            <p className="italic">Tidak ada ingatan yang cocok dengan saringan.</p>
          </div>
        ) : (
          filteredMemories.map((mem) => {
            const isSelected = selectedMemory?.id === mem.id;
            return (
              <button
                key={mem.id}
                type="button"
                onClick={() => onSelectMemory(mem)}
                className={`w-full text-left p-3 rounded-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-paper border-clay ring-1 ring-clay/40 shadow-xs'
                    : 'bg-paper/70 border-line hover:border-ink/30 hover:bg-paper'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] uppercase font-semibold tracking-wide text-tambak px-1.5 py-0.5 bg-tambak/10 rounded-sm">
                    {mem.category}
                  </span>
                  <span className="text-[10px] text-ink/45 shrink-0">
                    {new Date(mem.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-sm text-ink mb-1 line-clamp-1">
                  {mem.title}
                </h4>

                <div className="flex items-center text-xs text-clay gap-1 mb-1.5">
                  <svg
                    className="w-3 h-3 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium line-clamp-1">{mem.location.name}</span>
                </div>

                <p className="text-xs text-ink/75 line-clamp-2 leading-relaxed">
                  {mem.story}
                </p>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
