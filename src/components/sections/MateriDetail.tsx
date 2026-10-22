import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MateriItem } from '../../types/memory';
import { Button } from '../ui/Button';

export interface MateriDetailProps {
  materi: MateriItem;
  onBack: () => void;
  onSelectOtherMateri?: (materi: MateriItem) => void;
  allMemories?: MateriItem[];
}

/**
 * Halaman Detail Materi: Menampilkan isi materi lengkap saat penanda di peta ditekan,
 * dilengkapi transisi masuk & keluar kesedot yang halus (smooth suction portal zoom).
 */
export const MateriDetail: React.FC<MateriDetailProps> = ({
  materi,
  onBack,
  onSelectOtherMateri,
  allMemories = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Posisikan langsung ke puncak layar tanpa smooth-scroll yang bertabrakan dengan zoom
    window.scrollTo(0, 0);
    setIsExiting(false);
  }, [materi.id]);

  const handleBackWithAnimation = () => {
    if (shouldReduceMotion) {
      onBack();
      return;
    }
    setIsExiting(true);
    setTimeout(() => {
      onBack();
    }, 380);
  };

  const handleSelectOtherWithAnimation = (rel: MateriItem) => {
    if (onSelectOtherMateri) {
      onSelectOtherMateri(rel);
    }
  };

  const relatedMemories = allMemories.filter(
    (m) => m.id !== materi.id && (m.kecamatan === materi.kecamatan || m.category === materi.category)
  ).slice(0, 3);

  return (
    <motion.article
      key={materi.id}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.8,
              y: 35,
            }
      }
      animate={
        isExiting
          ? {
              opacity: 0,
              scale: 0.82,
              y: 25,
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      transition={{
        duration: isExiting ? 0.36 : 0.52,
        ease: isExiting ? [0.32, 0, 0.67, 0] : [0.16, 1, 0.3, 1],
      }}
      style={{
        transformOrigin: '50% 25vh',
        willChange: 'transform, opacity',
      }}
      className="min-h-screen bg-paper py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Efek visual gelombang portal masuk (smooth shockwave ring) */}
      {!shouldReduceMotion && !isExiting && (
        <>
          <motion.div
            initial={{ scale: 0.15, opacity: 0.85 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute top-[25vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-clay/40 bg-radial from-clay/15 via-tambak/10 to-transparent z-0"
            aria-hidden="true"
          />
          <motion.div
            initial={{ scale: 0.1, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
            className="pointer-events-none absolute top-[25vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-tambak/35 z-0"
            aria-hidden="true"
          />
        </>
      )}

      {/* Efek visual tersedot keluar saat kembali (reverse suction ring) */}
      {!shouldReduceMotion && isExiting && (
        <motion.div
          initial={{ scale: 2.2, opacity: 0 }}
          animate={{ scale: 0.15, opacity: 0.9 }}
          transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
          className="pointer-events-none absolute top-[25vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-clay/50 bg-radial from-clay/20 to-transparent z-0"
          aria-hidden="true"
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tombol Kembali & Breadcrumb */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-line"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBackWithAnimation}
            className="self-start gap-2 text-ink/80 hover:text-clay transition-all duration-200 hover:-translate-x-0.5"
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
        </motion.div>

        {/* Header Materi */}
        <motion.header
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-clay text-paper shadow-xs">
              Kecamatan {materi.kecamatan}
            </span>
            <span className="px-3 py-1 rounded-sm text-xs font-semibold tracking-wide bg-tambak/10 text-tambak border border-tambak/20">
              {materi.category}
            </span>
            {materi.koordinatText && (
              <span className="px-2.5 py-1 rounded-sm text-[11px] font-mono text-ink/70 bg-black/5">
                📍 {materi.koordinatText}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight mb-4">
            {materi.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2 text-xs text-ink/60 pb-6 border-b border-line">
            <div className="flex items-center gap-1.5 font-medium text-ink/80">
              <svg className="w-4 h-4 text-clay shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{materi.location?.name || `Kecamatan ${materi.kecamatan}`}</span>
            </div>
            <span>•</span>
            <span>Diperbarui {new Date(materi.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {materi.address && (
              <div className="w-full text-[11px] text-ink/70 flex items-start gap-1.5 mt-1 bg-paper border border-line/60 rounded px-2.5 py-1.5">
                <span className="font-semibold text-clay shrink-0">Alamat:</span>
                <span>{materi.address}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Foto Dokumentasi Materi (Responsif) */}
        {materi.imageUrl && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[400px] rounded-md overflow-hidden border border-line shadow-xs bg-[#EFE9DF] group">
              <img
                src={materi.imageUrl}
                alt={materi.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback jika koneksi gambar gagal
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-paper">
                <div>
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-clay/90 rounded-xs mb-1">
                    Dokumentasi {materi.kecamatan}
                  </span>
                  <p className="font-serif text-sm sm:text-lg font-bold text-paper drop-shadow-sm line-clamp-1">
                    {materi.title}
                  </p>
                </div>
                <span className="text-[11px] text-paper/80 font-mono hidden sm:inline-block bg-black/30 backdrop-blur-xs px-2 py-1 rounded">
                  {materi.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Uraian Konten Utama */}
        <motion.section
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="prose prose-stone max-w-none mb-10"
        >
          <div className="bg-[#FCFAF6] border border-line rounded-md p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3 pb-2 border-b border-line/60">
              Uraian Materi Kebudayaan
            </h2>
            <p className="text-sm sm:text-base text-ink/85 leading-relaxed text-justify whitespace-pre-line">
              {materi.content}
            </p>
          </div>
        </motion.section>

        {/* Sumber Referensi & Publikasi */}
        {materi.source && (
          <motion.section
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 bg-[#F6F2EA] border border-line rounded-md p-5 sm:p-6 text-xs text-ink/75 shadow-xs"
          >
            <h3 className="font-serif font-bold text-ink text-sm mb-1.5 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-tambak shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>Sumber Rujukan & Dokumen Kebudayaan</span>
            </h3>
            <p className="leading-relaxed font-mono text-[11px] text-ink/80 bg-paper/80 p-2.5 rounded border border-line/60">
              {materi.source}
            </p>
          </motion.section>
        )}

        {/* Rekomendasi Materi Terkait */}
        {relatedMemories.length > 0 && (
          <motion.section
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 border-t border-line mb-10"
          >
            <h3 className="font-serif text-lg font-bold text-ink mb-4">
              Materi Terkait Lainnya
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedMemories.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => handleSelectOtherWithAnimation(rel)}
                  className="p-4 bg-[#FAF7F2] border border-line rounded-md text-left hover:border-clay hover:bg-paper transition-all cursor-pointer group shadow-xs hover:-translate-y-0.5 duration-200"
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
          </motion.section>
        )}

        {/* Tombol Navigasi Bawah */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center pt-4"
        >
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleBackWithAnimation}
            className="gap-2 shadow-xs px-8 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali ke Peta Sidoarjo</span>
          </Button>
        </motion.div>

      </div>
    </motion.article>
  );
};
