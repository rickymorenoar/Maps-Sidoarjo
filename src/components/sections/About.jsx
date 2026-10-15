import React from 'react';
import { Reveal } from '../ui/Reveal';

/**
 * Section About: Tentang proyek Sidoarjo Memory Map dan cara kerjanya.
 * Didesain dengan tata letak editorial asimetris, garis 1px, tanpa kartu bayangan generik.
 */
export function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-line bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-clay/10 text-clay border border-clay/25 text-xs font-medium tracking-wide mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-clay"></span>
              <span>Tentang Inisiatif</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
              Merekam yang Kerap Luput dari Peta Resmi
            </h2>
            <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-sans">
              Peta konvensional hanya menandai jalan tol, batas administratif, dan gedung-gedung besar. Sidoarjo Memory Map hadir sebagai arsip tandingan: memetakan rasa, ingatan keluarga, dan aroma masa lalu yang menempel pada tanah Delta.
            </p>
          </Reveal>
        </div>

        {/* Konten Editorial Asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Kolom Kiri: Refleksi Budaya Delta */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <div className="border-l-2 border-clay pl-5">
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  Tanah Delta antara Pesisir dan Peradaban Tua
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  Terletak di antara Kali Surabaya dan Kali Porong, Sidoarjo merupakan delta subur yang sejak era Kerajaan Kahuripan dan Majapahit menjadi urat nadi perairan Jawa Timur. Dari bata merah Candi Dermo hingga tambak bandeng di Sedati, setiap jengkal ruang memiliki lapisan waktu.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-5 bg-paper rounded-md border border-line text-xs sm:text-sm text-ink/80 leading-relaxed space-y-2">
                <p className="font-semibold text-ink">
                  Mengapa Ingatan Warga Penting?
                </p>
                <p>
                  Peristiwa demi peristiwa—mulai dari pergeseran pemukiman akibat semburan lumpur di Porong, bertahan-hidupnya perajin batik di Jetis, hingga obrolan di warung lontong kupang—membentuk identitas kolektif yang tak ternilai.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Kolom Kanan: Tiga Pilar Cara Kerja Sistem */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.15}>
              <h3 className="font-serif text-2xl font-bold text-ink mb-6">
                Bagaimana Peta Ini Bekerja?
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
                      Penceritaan Bebas & Alami
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Anda cukup menuangkan cerita dalam bahasa sehari-hari. Tak perlu repot mencari titik koordinat atau istilah peta yang kaku; tulislah seperti sedang bercerita pada seorang sahabat.
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
                      Deteksi Entitas & Kategori Lokal (NLP Berbasis Aturan)
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Sistem memindai kata kunci kultural Sidoarjo—mulai dari nama candi, kampung pengrajin kulit Tanggulangin, sentra batik Jetis, hingga hidangan tambak. Sistem kemudian menempatkan penanda tepat di lokasi yang bersangkutan secara otomatis.
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
                      Kedaulatan Data di Peramban Anda
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Cerita Anda disimpan langsung di penyimpanan lokal (<code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">localStorage</code>) peramban Anda. Tidak ada data pribadi yang dilempar ke peladen luar tanpa seizin Anda.
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
}
