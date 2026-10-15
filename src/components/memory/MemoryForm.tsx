import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { analyzeStory } from '../../lib/nlp';
import { KECAMATAN_LIST } from '../../lib/constants';
import { CATEGORIES } from '../../lib/categories';
import { MateriItem } from '../../types/memory';

export interface MemoryFormProps {
  onAddMemory: (materi: MateriItem) => void;
}

/**
 * Form untuk menyimpan materi edukasi / data pembelajaran di tiap kecamatan Sidoarjo.
 */
export const MemoryForm: React.FC<MemoryFormProps> = ({ onAddMemory }) => {
  const [kecamatan, setKecamatan] = useState<string>('Sidoarjo');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>(CATEGORIES[0].name);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successInfo, setSuccessInfo] = useState<string>('');

  // Saat konten berubah, coba lakukan auto-deteksi jika judul / kecamatan belum diisi
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    if (error) setError('');
    if (successInfo) setSuccessInfo('');
  };

  const handleAutoDetect = () => {
    if (!content.trim()) {
      setError('Tuliskan isi materi terlebih dahulu untuk menjalankan deteksi otomatis.');
      return;
    }
    const res = analyzeStory(content);
    setKecamatan(res.kecamatan);
    setCategory(res.category);
    setSuccessInfo(res.message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanContent = content.trim();
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError('Mohon masukkan judul materi.');
      return;
    }

    if (!cleanContent) {
      setError('Mohon masukkan isi atau ringkasan materi.');
      return;
    }

    if (cleanContent.length < 15) {
      setError('Isi materi terlalu pendek. Tuliskan ringkasan materi minimal 15 karakter.');
      return;
    }

    // Cari koordinat kecamatan yang dipilih
    const selectedKecInfo = KECAMATAN_LIST.find((k) => k.name === kecamatan) || KECAMATAN_LIST[0];

    const newMateri: MateriItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `materi-${Date.now()}`,
      title: cleanTitle,
      kecamatan: selectedKecInfo.name,
      category,
      content: cleanContent,
      location: {
        name: `Kecamatan ${selectedKecInfo.name}`,
        kecamatan: selectedKecInfo.name,
        lat: selectedKecInfo.lat,
        lng: selectedKecInfo.lng,
      },
      createdAt: Date.now(),
    };

    onAddMemory(newMateri);
    setTitle('');
    setContent('');
    setError('');
    setSuccessInfo(`Materi "${cleanTitle}" berhasil disematkan pada Kecamatan ${selectedKecInfo.name}.`);
  };

  return (
    <div className="bg-[#FAF7F2] border border-line rounded-md p-4 sm:p-5 shadow-xs">
      <div className="mb-3">
        <h3 className="font-serif text-base sm:text-lg font-bold text-ink">
          Simpan Materi Baru per Kecamatan
        </h3>
        <p className="text-xs text-ink/70 leading-relaxed mt-0.5">
          Dokumentasikan modul, potensi, sejarah, atau materi pembelajaran untuk kecamatan di Kabupaten Sidoarjo.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        
        {/* Pilih Kecamatan (18 Kecamatan Sidoarjo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="materi-kecamatan"
              className="block text-xs font-semibold text-ink/80 mb-1 uppercase tracking-wider"
            >
              Kecamatan <span className="text-clay">*</span>
            </label>
            <select
              id="materi-kecamatan"
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              className="w-full bg-paper border border-line rounded-md px-3 py-2 text-xs text-ink focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay/30"
            >
              {KECAMATAN_LIST.map((kec) => (
                <option key={kec.name} value={kec.name}>
                  Kecamatan {kec.name}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori Materi */}
          <div>
            <label
              htmlFor="materi-category"
              className="block text-xs font-semibold text-ink/80 mb-1 uppercase tracking-wider"
            >
              Kategori Materi <span className="text-clay">*</span>
            </label>
            <select
              id="materi-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-paper border border-line rounded-md px-3 py-2 text-xs text-ink focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay/30"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Judul Materi */}
        <div>
          <label
            htmlFor="materi-title"
            className="block text-xs font-semibold text-ink/80 mb-1 uppercase tracking-wider"
          >
            Judul Materi <span className="text-clay">*</span>
          </label>
          <input
            type="text"
            id="materi-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Contoh: Sentra Industri Logam & Rantai Pasok UMKM"
            className="w-full bg-paper border border-line rounded-md px-3 py-2 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay/30"
          />
        </div>

        {/* Isi / Ringkasan Materi */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="materi-content"
              className="block text-xs font-semibold text-ink/80 uppercase tracking-wider"
            >
              Isi Materi Pembelajaran <span className="text-clay">*</span>
            </label>
            <button
              type="button"
              onClick={handleAutoDetect}
              className="text-[11px] text-tambak hover:text-clay font-medium cursor-pointer underline underline-offset-2"
            >
              Deteksi Kecamatan dari Teks
            </button>
          </div>
          <textarea
            id="materi-content"
            rows={4}
            value={content}
            onChange={handleContentChange}
            placeholder="Tuliskan uraian materi, potensi wilayah, data sejarah, atau catatan pembelajaran untuk kecamatan ini..."
            className={`w-full bg-paper border ${
              error ? 'border-red-500 ring-1 ring-red-400' : 'border-line hover:border-ink/30 focus:border-clay'
            } rounded-md p-3 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:ring-1 focus:ring-clay/30 leading-relaxed resize-y`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'materi-error' : undefined}
          />

          {error && (
            <p id="materi-error" role="alert" className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <span>{error}</span>
            </p>
          )}

          {successInfo && (
            <p className="text-[11px] text-tambak bg-tambak/10 border border-tambak/20 rounded p-2 mt-1.5 leading-relaxed">
              {successInfo}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-ink/50">
            {content.length > 0 ? `${content.length} karakter` : 'Tersimpan di browser per kecamatan'}
          </span>
          <Button type="submit" variant="primary" size="md">
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Simpan Materi ke Peta</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
