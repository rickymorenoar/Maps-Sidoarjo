import React, { useEffect } from 'react';
import { MateriItem } from '../../types/memory';
import { Button } from '../ui/Button';

export interface MateriDetailProps {
  materi: MateriItem;
  onBack: () => void;
  onSelectOtherMateri?: (materi: MateriItem) => void;
  allMemories?: MateriItem[];
}

/**
 * Halaman Detail Materi: Menampilkan isi materi lengkap saat penanda di peta ditekan.
 */
export const MateriDetail: React.FC<MateriDetailProps> = ({
  materi,
  onBack,
  onSelectOtherMateri,
  allMemories = [],
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [materi.id]);

  const relatedMemories = allMemories.filter(
    (m) => m.id !== materi.id && (m.kecamatan === materi.kecamatan || m.category === materi.category)
  ).slice(0, 3);

  return (
    <article className="min-h-screen bg-paper py-10 sm:py-16 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Kembali & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-line">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBack}
            className="self-start gap-2 text-ink/80 hover:text-clay"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Peta Materi</span>
          </Button>

          <nav className="text-xs text-ink/50 flex items-center gap-1.5 overflow-x-auto" aria-label="Breadcrumb">
            <span>Peta Materi</span>
            <span>/</span>
            <span className="text-clay font-medium whitespace-nowrap">Kec. {materi.kecamatan}</span>
            <span>/</span>
            <span className="text-ink/80 truncate max-w-[200px]">{materi.title}</span>
          </nav>
        </div>

        {/* Header Materi */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-clay text-paper shadow-xs">
              Kecamatan {materi.kecamatan}
            </span>
            <span className="px-3 py-1 rounded-sm text-xs font-semibold tracking-wide bg-tambak/10 text-tambak border border-tambak/20">
              {materi.category}
            </span>
            <span className="px-2.5 py-1 rounded-sm text-[11px] font-mono text-ink/60 bg-black/5">
              Lat: {materi.location?.lat.toFixed(4)}, Lng: {materi.location?.lng.toFixed(4)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight mb-4">
            {materi.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-ink/60 pb-6 border-b border-line">
            <svg className="w-4 h-4 text-clay shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-ink/80">{materi.location?.name || `Kecamatan ${materi.kecamatan}`}</span>
            <span>•</span>
            <span>Diperbarui {new Date(materi.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Ringkasan Eksekutif */}
        {materi.summary && (
          <div className="p-5 sm:p-6 rounded-md bg-[#FAF6EE] border-l-4 border-clay border border-line mb-8 shadow-xs">
            <h3 className="text-xs uppercase font-bold tracking-wider text-clay mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-clay"></span>
              <span>Intisari Materi Pembelajaran</span>
            </h3>
            <p className="font-serif text-base sm:text-lg text-ink/90 leading-relaxed italic">
              "{materi.summary}"
            </p>
          </div>
        )}

        {/* Uraian Konten Utama */}
        <section className="prose prose-stone max-w-none mb-10">
          <div className="bg-[#FCFAF6] border border-line rounded-md p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3 pb-2 border-b border-line/60">
              Uraian Materi Wilayah
            </h2>
            <p className="text-sm sm:text-base text-ink/85 leading-relaxed text-justify">
              {materi.content}
            </p>
          </div>
        </section>

        {/* Poin-Poin Penting */}
        {materi.keyPoints && materi.keyPoints.length > 0 && (
          <section className="mb-10 bg-[#FAF7F2] border border-line rounded-md p-6 sm:p-8 shadow-xs">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-tambak shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Poin Kunci & Karakteristik Wilayah</span>
            </h2>
            <ul className="space-y-3">
              {materi.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink/80 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-tambak/10 text-tambak flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Konteks Sejarah / Nilai Budaya */}
        {materi.historicalContext && (
          <section className="mb-12 bg-paper border border-line rounded-md p-6 sm:p-8">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-ink mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-clay shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Catatan Sejarah & Signifikansi Budaya</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic">
              {materi.historicalContext}
            </p>
          </section>
        )}

        {/* Rekomendasi Materi Terkait */}
        {relatedMemories.length > 0 && (
          <section className="pt-8 border-t border-line mb-10">
            <h3 className="font-serif text-lg font-bold text-ink mb-4">
              Materi Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedMemories.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectOtherMateri ? onSelectOtherMateri(rel) : null}
                  className="p-4 bg-[#FAF7F2] border border-line rounded-md text-left hover:border-clay hover:bg-paper transition-all cursor-pointer group shadow-xs"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-clay block mb-1">
                    Kec. {rel.kecamatan}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-ink group-hover:text-clay transition-colors line-clamp-2 mb-1.5">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-ink/70 line-clamp-2 leading-relaxed">
                    {rel.content}
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Tombol Navigasi Bawah */}
        <div className="flex justify-center pt-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={onBack}
            className="gap-2 shadow-xs px-8"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Peta Sidoarjo</span>
          </Button>
        </div>

      </div>
    </article>
  );
};
