import React from 'react';

/**
 * Footer di dasar halaman.
 * Sesuai aturan CLAUDE.md:
 * - Tidak ada di navbar.
 * - Tidak berisi tautan section sebagai pengganti navbar.
 * - Berisi: nama proyek, atribusi OpenStreetMap, tahun, dan kontak singkat.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#EFE9DF] text-ink py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Kolom 1: Nama Proyek & Deskripsi */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-clay"></span>
              <h3 className="font-serif font-bold text-base text-ink">
                Sidoarjo Memory Map
              </h3>
            </div>
            <p className="text-xs text-ink/75 leading-relaxed max-w-sm">
              Inisiatif pemetaan partisipatif untuk mendokumentasikan memori kolektif, warisan kultural, dan lanskap keseharian masyarakat Kabupaten Sidoarjo.
            </p>
          </div>

          {/* Kolom 2: Atribusi Peta */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Data & Sumber Daya
            </h4>
            <p className="text-xs text-ink/75 leading-relaxed">
              Data peta bersumber dari{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay hover:underline underline-offset-2"
              >
                OpenStreetMap contributors
              </a>
              . Ubin peta dilayani di bawah lisensi terbuka.
            </p>
          </div>

          {/* Kolom 3: Kontak Singkat */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Kontak & Kolaborasi
            </h4>
            <p className="text-xs text-ink/75 leading-relaxed">
              Punya arsip keluarga, foto lawas, atau kisah tutur Sidoarjo? Kirimkan pesan melalui formulir kontak di atas atau hubungi kurator proyek.
            </p>
          </div>
        </div>

        {/* Baris Hak Cipta & Tahun */}
        <div className="border-t border-line/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink/60 gap-3">
          <p>© {currentYear} Sidoarjo Memory Map. Dibuat dengan penghargaan mendalam bagi tanah Delta.</p>
          <p className="italic">Tanah Delta • Ingatan Kolektif • Warisan Budaya</p>
        </div>
      </div>
    </footer>
  );
}
