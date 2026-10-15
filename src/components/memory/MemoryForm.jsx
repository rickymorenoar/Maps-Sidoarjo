import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { analyzeStory, generateTitle } from '../../lib/nlp';

/**
 * Form untuk menuliskan ingatan/cerita warga.
 * Menganalisis teks secara otomatis dengan NLP rule-based, memvalidasi tanpa alert(),
 * dan memicu penambahan pin baru di peta.
 */
export function MemoryForm({ onAddMemory }) {
  const [story, setStory] = useState('');
  const [error, setError] = useState('');
  const [lastAnalysis, setLastAnalysis] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanStory = story.trim();

    if (!cleanStory) {
      setError('Mohon tuliskan sepenggal cerita atau ingatan sebelum mengirim.');
      return;
    }

    if (cleanStory.length < 10) {
      setError('Cerita terlalu pendek. Ceritakan sedikit lebih detail agar dapat dipetakan.');
      return;
    }

    // Jalankan NLP analyzer
    const analysis = analyzeStory(cleanStory);
    const title = generateTitle(cleanStory);

    const newMemory = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `mem-${Date.now()}`,
      story: cleanStory,
      title,
      location: analysis.location,
      category: analysis.category,
      createdAt: Date.now(),
    };

    onAddMemory(newMemory);
    setLastAnalysis(analysis);
    setStory('');
    setError('');
  };

  return (
    <div className="bg-[#FAF7F2] border border-line rounded-md p-5 shadow-xs">
      <div className="mb-3">
        <h3 className="font-serif text-lg font-bold text-ink">
          Goreskan Ingatan Anda
        </h3>
        <p className="text-xs text-ink/70 leading-relaxed mt-0.5">
          Ceritakan tempat, tradisi kuliner, peristiwa masa lalu, atau suasana sudut Sidoarjo yang membekas. Sistem akan memetakan lokasinya secara otomatis.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label
            htmlFor="memory-story-input"
            className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider"
          >
            Cerita Ingatan
          </label>
          <textarea
            id="memory-story-input"
            rows={4}
            value={story}
            onChange={(e) => {
              setStory(e.target.value);
              if (error) setError('');
              if (lastAnalysis) setLastAnalysis(null);
            }}
            placeholder="Contoh: Setiap sore saya selalu ingat aroma tanah basah di sekitar Candi Pari saat pulang sekolah bersama kawan..."
            className={`w-full bg-paper border ${
              error ? 'border-red-500 ring-1 ring-red-400' : 'border-line hover:border-ink/30 focus:border-clay'
            } rounded-md p-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-clay/40 transition-colors leading-relaxed resize-y`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'story-error-message' : undefined}
          />

          {error && (
            <p
              id="story-error-message"
              role="alert"
              className="text-xs text-red-600 mt-1.5 flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Notifikasi hasil analisis NLP terakhir */}
        {lastAnalysis && (
          <div
            aria-live="polite"
            className={`text-xs p-2.5 rounded-sm mb-3 border ${
              lastAnalysis.isDefaultLocation
                ? 'bg-[#F2ECE1] border-line text-ink/80'
                : 'bg-tambak/10 border-tambak/25 text-tambak'
            }`}
          >
            <div className="font-medium flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-clay shrink-0"></span>
              <span>Hasil Analisis NLP:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-ink/85">
              {lastAnalysis.message}
            </p>
            {lastAnalysis.matchedKeywords.location.length > 0 && (
              <p className="text-[10px] text-ink/60 mt-1">
                Kata kunci terdeteksi: {lastAnalysis.matchedKeywords.location.join(', ')}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-ink/50">
            {story.length > 0 ? `${story.length} karakter` : 'Disimpan di peramban Anda'}
          </span>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Tancapkan di Peta</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
