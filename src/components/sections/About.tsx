import React from 'react';
import { Reveal } from '../ui/Reveal';

export const About: React.FC = () => {
  return (
    <section id="about" className="pt-8 pb-16 md:pt-14 md:pb-24 min-h-[calc(100vh-4rem)] border-t border-line bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-clay/10 text-clay border border-clay/25 text-xs font-medium tracking-wide mb-3">
              <span>Tentang Platform</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
              Pusat Materi Edukasi Terpadu di 18 Kecamatan
            </h2>
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-sans">
              Platform ini dirancang khusus untuk menyimpan, mengkategorikan, dan memvisualisasikan materi pembelajaran, data sejarah, potensi ekonomi, dan karakteristik lingkungan di setiap kecamatan Kabupaten Sidoarjo.
            </p>
          </Reveal>
        </div>

        {/* Konten Editorial Asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <div className="border-l-2 border-clay pl-5">
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  Kekayaan Materi Berbasis Wilayah
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  Setiap kecamatan di Sidoarjo memiliki keunikan studi yang kaya: dari materi geologi dan cagar budaya di Porong, ekosistem tambak bandeng di Sedati, hingga sentra kerajinan industri di Tanggulangin. Pengorganisasian materi per kecamatan memudahkan eksplorasi tematik berbasis ruang nyata.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-5 bg-paper rounded-md border border-line text-xs sm:text-sm text-ink/80 leading-relaxed space-y-2">
                <p className="font-semibold text-ink">
                  Fungsi & Keunggulan Platform
                </p>
                <p>
                  Siswa, pengajar, peneliti, dan masyarakat dapat menyematkan materi baru ke kecamatan mana pun secara langsung, memfilter arsip materi berdasarkan kecamatan dan kategori, serta meninjau koordinatnya di peta interaktif.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.15}>
              <h3 className="font-serif text-2xl font-bold text-ink mb-6">
                Bagaimana Sistem Bekerja?
              </h3>
            </Reveal>

            <div className="space-y-6">
              
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4 p-4 rounded-md border border-line bg-paper">
                  <span className="w-8 h-8 rounded-full bg-clay text-paper flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink mb-1">
                      Pilih Kecamatan & Tuliskan Materi
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Pilih salah satu dari 18 kecamatan di Sidoarjo, tentukan kategori materi (Sejarah, Industri, Perikanan, Geografi, dll.), lalu ketikkan judul dan ringkasan materi pembelajaran.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex items-start gap-4 p-4 rounded-md border border-line bg-paper">
                  <span className="w-8 h-8 rounded-full bg-tambak text-paper flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink mb-1">
                      Penyematan Koordinat & Deteksi Cerdas
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Sistem secara otomatis menautkan materi Anda ke koordinat geografis pusat kecamatan terkait pada peta Leaflet. Terdapat pula tombol deteksi otomatis dari isi teks materi.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex items-start gap-4 p-4 rounded-md border border-line bg-paper">
                  <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-ink mb-1">
                      Penyimpanan Lokal & Filter Terpadu
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Seluruh materi tersimpan langsung di browser peramban Anda (<code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">localStorage</code>) sehingga cepat diakses kapan saja dan dapat disaring berdasarkan kecamatan dan kategori.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
