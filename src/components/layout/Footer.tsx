import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#EFE9DF] text-ink py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-ink">
                Peta Materi Sidoarjo
              </h3>
            </div>
            <p className="text-xs text-ink/75 leading-relaxed max-w-sm">
              Sistem informasi dan pemetaan materi edukasi terpadu di 18 kecamatan Kabupaten Sidoarjo. Mendokumentasikan materi cagar budaya, potensi industri UMKM, dan sains geografis.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Data & Sumber Daya
            </h4>
            <p className="text-xs text-ink/75 leading-relaxed">
              Peta interaktif menggunakan data terbuka dari{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay hover:underline underline-offset-2"
              >
                OpenStreetMap contributors
              </a>
              . Seluruh data disimpan langsung di penyimpanan peramban pengguna.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/70">
              Kontak & Kolaborasi
            </h4>
            <p className="text-xs text-ink/75 leading-relaxed">
              Memiliki materi pembelajaran, modul sekolah, atau data potensi kecamatan yang ingin dimasukkan? Hubungi kurator melalui formulir kontak.
            </p>
          </div>
        </div>

        <div className="border-t border-line/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink/60 gap-3">
          <p>© {currentYear} Peta Materi Sidoarjo. Basis Data Edukasi 18 Kecamatan.</p>
          <p className="italic">18 Kecamatan • Materi Terpetakan • Edukasi Terpadu • SMP Negeri 1 Gedangan</p>
        </div>
      </div>
    </footer>
  );
};
