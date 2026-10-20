import { MateriItem } from '../types/memory';

/**
 * Data kebudayaan resmi untuk 18 Kecamatan di Kabupaten Sidoarjo.
 * Disesuaikan persis dengan dokumen materi: judul, alamat, koordinat grafis/geografis, konten, dan sumber rujukan.
 */
export const SEED_MEMORIES: MateriItem[] = [
  // 1. BALONGBENDO
  {
    id: 'balongbendo-tradisi-ludruk',
    title: 'Tradisi Ludruk',
    kecamatan: 'Balongbendo',
    category: 'Seni Budaya & Tradisi',
    address: 'Dusun Kemambang, RT 08 / RW 01, Desa Sumokembangsri, Kecamatan Balongbendo, Kabupaten Sidoarjo, Jawa Timur 61263',
    koordinatText: 'Koordinat grafis: -7.4289, 112.5053',
    location: {
      name: 'Dusun Kemambang, Desa Sumokembangsri',
      kecamatan: 'Balongbendo',
      lat: -7.4289,
      lng: 112.5053,
    },
    content: 'Ludruk adalah seni drama panggung khas Jawa Timur yang menceritakan kehidupan sehari-hari dengan cara yang santai, kocak, dan penuh cerita lucu, yang biasanya dibuka dengan tarian khas Tari Remo. Ciri khasnya yang paling bikin betah menonton adalah gaya bahasanya yang merakyat, ceplas-ceplos, dan sering diselingi humor serta sindiran ringan yang terasa sangat dekat dengan kehidupan kita. Supaya kesenian ini tidak hilang ditelan zaman, para seniman terus menjaga kelestariannya dengan cara mengemas pertunjukan jadi lebih modern, merangkul anak-anak muda untuk ikut latihan, serta memanfaatkan media sosial agar cerita ludruk tetap seru dan dinikmati oleh semua kalangan. Sampai saati ini tradisi ludruk di sidoarjo masih ada loh, Meskipun frekuensi pertunjukannya tidak sebanyak pada era keemasannya, ludruk tetap hidup melalui berbagai upaya dan bentuk adaptasi.',
    source: 'Gelar, A., & Handayaningrum, W. (2018). Kreasi Bentuk Tari Remo Gandrung Pada Ludruk Irama Baru di Balongbendo Kabupaten Sidoarjo. Jurnal Solah, Program Studi Pendidikan Seni Tari, Universitas Negeri Surabaya (Unesa). Tautan Artikel di Google Scholar, Rahmadani, H. D. (2021).Sejarah Kesenian Ludruk Irama Baru Kabupaten Sidoarjo Tahun 2014-2019. Repository Universitas PGRI Delta.',
    createdAt: 1710000001000,
  },

  // 2. BUDURAN
  {
    id: 'buduran-museum-mpu-tantular',
    title: 'Museum Mpu Tantular',
    kecamatan: 'Buduran',
    category: 'Sejarah & Cagar Budaya',
    address: 'Jl. Raya Buduran – Jembatan Layang, Bedrek, Siwalanpanji, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252',
    koordinatText: 'Koordinat grafis: -7.432409, 112.730372',
    location: {
      name: 'Jl. Raya Buduran – Jembatan Layang, Bedrek, Siwalanpanji',
      kecamatan: 'Buduran',
      lat: -7.432409,
      lng: 112.730372,
    },
    content: 'Museum Mpu Tantular berawal dari koleksi pribadi pecinta sejarah G.H. von Faber di Surabaya pada tahun 1933, yang kini berdiri megah di Buduran, Sidoarjo. Nama museum ini diambil dari Mpu Tantular, sang pujangga besar pencetus semboyan Bhinneka Tunggal Ika. Menjadi rumah bagi ribuan warisan sejarah, arkeologi, dan budaya Nusantara, museum ini terus hidup sebagai jendela masa lalu yang keren dan edukatif bagi semua generasi.',
    source: 'Indonesia.travel – "Museum Negeri Mpu Tantular: Sejarah & Budaya Jawa Timur" (2022).',
    createdAt: 1710000002000,
  },

  // 3. CANDI
  {
    id: 'candi-nyadran',
    title: 'Nyadran',
    kecamatan: 'Candi',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Raya Maritim No. 01, Desa Balongdowo',
    koordinatText: 'Koordinat grafis: -7.4961, 112.7306',
    location: {
      name: 'Jl. Raya Maritim No. 01, Desa Balongdowo',
      kecamatan: 'Candi',
      lat: -7.4961,
      lng: 112.7306,
    },
    content: 'Tradisi Nyadran di Candi, Sidoarjo—khususnya di kawasan pesisir—merupakan ritual syukuran laut yang super meriah menjelang bulan Ramadan. Uniknya, warga berbondong-bondong naik perahu hias menyusuri sungai menuju makam Dewi Sekardadu untuk berdoa bersama dan melarungkan sedekah bumi sebagai ungkapan syukur atas limpahan rezeki. Paduan wisata religi, gotong royong, dan keindahan budaya lokal ini sukses bikin tradisi leluhur tetap hidup dan memikat hati siapa saja.',
    source: 'DetikJatim – Liputan budaya "Tradisi Nyadran di Pesisir Sidoarjo" (2023) & Repository Akademik / Jurnal Kebudayaan Lokal – Kajian tentang Tradisi Nyadran Masyarakat Pesisir Kecamatan Candi, Sidoarjo (2012)',
    createdAt: 1710000003000,
  },

  // 4. GEDANGAN
  {
    id: 'gedangan-kampung-topi',
    title: 'Kampung Topi',
    kecamatan: 'Gedangan',
    category: 'Industri Kreatif & UMKM',
    address: 'Desa Punggul, Kecamatan Gedangan, Kabupaten Sidoarjo, Provinsi Jawa Timur, Indonesia',
    koordinatText: 'Koordinat geografis: -7.39806, 112.73833',
    location: {
      name: 'Desa Punggul, Kecamatan Gedangan',
      kecamatan: 'Gedangan',
      lat: -7.39806,
      lng: 112.73833,
    },
    content: 'Kampung Topi di Desa Punggul, Kecamatan Gedangan, Sidoarjo, merupakan sentra industri kreatif legendaris yang telah merintis produksi berbagai macam topi (terutama topi sekolah, instansi, hingga perusahaan) sejak tahun 1970 berkat perintis awal almarhum Bapak H.M. Thoha. Kawasan ini resmi dinobatkan sebagai "Kampung Topi" oleh Pemerintah Kabupaten Sidoarjo pada tahun 2012 karena sebagian besar warganya aktif bergerak sebagai perajin konveksi mandiri. Menjadi salah satu pemasok atribut sekolah terbesar di Jawa Timur yang produknya telah menembus pasar luas, sentra ini selalu panen pesanan melimpah setiap tahunnya, memadukan tradisi gotong royong warga dengan pemasaran digital yang makin modern.',
    source: 'Jurnal Ilmiah Avatara / UNESA (2016) & DetikJatim (Liputan bisnis & UMKM) (2025).',
    createdAt: 1710000004000,
  },

  // 5. JABON
  {
    id: 'jabon-jejak-kota-lama-kauman',
    title: 'Jejak kota lama di dusun Kauman',
    kecamatan: 'Jabon',
    category: 'Sejarah & Cagar Budaya',
    address: 'Jl. Gajah Mada No.19, Pekauman, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213',
    koordinatText: 'Koordinat grafis: -7.4523, 112.7169',
    location: {
      name: 'Dusun Kauman di Desa Kedungcangkring, Jabon',
      kecamatan: 'Jabon',
      lat: -7.4523,
      lng: 112.7169,
    },
    content: 'Dusun Kauman di Desa Kedungcangkring, Jabon, Sidoarjo, menyimpan pesona sejarah yang luar biasa berkat keberadaan puluhan rumah kuno bergaya Indis peninggalan masa kolonial—dengan beberapa bangunan ikonik yang telah berdiri kokoh sejak tahun 1818. Arsitektur megah yang memadukan sentuhan budaya Eropa dan tradisional Jawa ini tidak hanya menjadi saksi bisu kejayaan kawasan tersebut sebagai pusat perdagangan dan kota lama di era kolonial, tetapi juga terus dirawat oleh warga sebagai warisan budaya berharga yang memperkaya identitas sejarah Sidoarjo.',
    source: 'DetikJatim – Laporan budaya & arsitektur (2026) & DetikJatim – Liputan khusus sejarah budaya (2026).',
    createdAt: 1710000005000,
  },

  // 6. KREMBUNG
  {
    id: 'krembung-pura-penataran-margowening',
    title: 'Pura Penataran Agung Margowening',
    kecamatan: 'Krembung',
    category: 'Sejarah & Cagar Budaya',
    address: 'FJXM+WHG, Unnamed Road, Balong Garut, Balonggarut, Kec. Krembung, Kabupaten Sidoarjo, Jawa Timur 61275',
    koordinatText: 'Koordinat grafis: -7.5008, 112.6397',
    location: {
      name: 'Balong Garut, Balonggarut, Kec. Krembung',
      kecamatan: 'Krembung',
      lat: -7.5008,
      lng: 112.6397,
    },
    content: 'Pura Penataran Agung Margo Wening yang terletak di Desa Balonggarut, Kecamatan Krembung, merupakan pura pertama dalam sejarah Kabupaten Sidoarjo yang mulai dibangun sejak tahun 1977. Berdiri di tengah perkampungan yang mayoritas penduduknya beragama Islam, pura ini berawal dari perjuangan komunitas penghayat kepercayaan/Buddha Jawi Wisnu yang dipelopori oleh tokoh lokal bernama Mbah Untung sejak awal tahun 1970-an. Selain menjadi pusat ibadah bagi umat Hindu asli Jawa, keberadaan pura ini juga menjadi simbol kerukunan umat beragama serta wujud pelestarian tradisi spiritual Nusantara yang hidup berdampingan secara harmonis di Sidoarjo.',
    source: 'Jurnal Avatara / UNESA – Artikel penelitian sejarah (2023), Tribun Bali – Laporan khusus sejarah (2017), Dinas Kebudayaan dan Pariwisata Provinsi Jawa Timur (SIDITA) – Direktori profil destinasi kebudayaan (2021-2023).',
    createdAt: 1710000006000,
  },

  // 7. KRIAN
  {
    id: 'krian-tumpeng-tempe',
    title: 'Tumpeng tempe',
    kecamatan: 'Krian',
    category: 'Gastronomi & Olahan Pangan',
    address: 'HHGQ+228, Jl. Raya Sedenganmijen No.1, Mijen, Sadenganmijen, Kec. Krian, Kabupaten Sidoarjo, Jawa Timur 61261',
    koordinatText: 'Koordinat grafis: -7.4124, 112.6074',
    location: {
      name: 'HHGQ+228, Jl. Raya Sedenganmijen No.1, Sadenganmijen',
      kecamatan: 'Krian',
      lat: -7.4124,
      lng: 112.6074,
    },
    content: 'Tumpeng tempe adalah makanan tradisional yang memiliki bentuk kerucut dan memanfaatkan tempe sebagai bahan utama. Hidangan ini memainkan peranan penting dalam upacara Ruwah Desa yang diadakan di Desa Sedengan Mijen, Kecamatan Krian, Kabupaten Sidoarjo. Warisan budaya ini tidak hanya berfungsi sebagai sajian dalam kegiatan tradisi, tetapi juga mengandung makna simbolis yang mencerminkan identitas komunitas pembuat tempe, simbol kesederhanaan, ungkapan rasa syukur terhadap rezeki yang diterima, serta cara penghormatan kepada nenek moyang. Bentuk kerucut yang menjulang ke atas dipahami sebagai simbol doa yang disampaikan kepada Tuhan Yang Maha Esa (Sholicha et al., 2026).',
    source: 'Sholicha et al., 2026.',
    createdAt: 1710000007000,
  },

  // 8. PORONG - Candi Sumur
  {
    id: 'porong-candi-sumur',
    title: 'Candi Sumur',
    kecamatan: 'Porong',
    category: 'Sejarah & Cagar Budaya',
    address: 'FMMM+554, Candipari Kulon, Candipari, Kec. Porong, Kabupaten Sidoarjo, Jawa Timur 61274',
    koordinatText: 'Koordinat grafis: -7.5186, 112.6825',
    location: {
      name: 'FMMM+554, Candipari Kulon, Candipari, Porong',
      kecamatan: 'Porong',
      lat: -7.5186,
      lng: 112.6825,
    },
    content: 'Candi Sumur merupakan salah satu warisan sejarah dari era Kerajaan Majapahit yang berada di Desa Candi Pari, Kecamatan Porong, Kabupaten Sidoarjo, Jawa Timur. Bangunan ini diperkirakan didirikan pada abad ke-14 Masehi, ketika Raja Hayam Wuruk memerintah. Asal nama Candi Sumur diambil dari adanya sumur di dalam struktur bangunan yang kini telah kering. Diperkirakan Candi Sumur memiliki hubungan dengan Candi Pari dan diduga difungsikan sebagai lokasi pengambilan air untuk melakukan penyucian sebelum beribadah (Putri et al., 2022).',
    source: 'Putri et al., 2022.',
    createdAt: 1710000008000,
  },

  // 9. PORONG - Candi Pari
  {
    id: 'porong-candi-pari',
    title: 'Candi Pari',
    kecamatan: 'Porong',
    category: 'Sejarah & Cagar Budaya',
    address: 'Jl. Kartini, Candipari Wetan, Candipari, Kec. Porong, Kabupaten Sidoarjo, Jawa Timur 61274',
    koordinatText: 'Koordinat grafis: -7.5153, 112.6829',
    location: {
      name: 'Jl. Kartini, Candipari Wetan, Candipari, Porong',
      kecamatan: 'Porong',
      lat: -7.5153,
      lng: 112.6829,
    },
    content: 'Candi Pari adalah sebuah situs warisan budaya yang berasal dari era Kerajaan Majapahit, berlokasi di Desa Candi Pari, Kecamatan Porong, Kabupaten Sidoarjo, di Jawa Timur. Diperkirakan bahwa candi ini didirikan pada tahun 1371 Masehi, menawarkan keunikan dalam bentuk struktur dan ornamen yang terpengaruh oleh gaya arsitektur Campa. Candi Pari menjadi salah satu saksi sejarah sekaligus warisan budaya yang harus dirawat dan dilindungi oleh masyarakat (Mufidah & Suprayitno, 2021).',
    source: 'Mufidah & Suprayitno, 2021.',
    createdAt: 1710000009000,
  },

  // 10. PRAMBON
  {
    id: 'prambon-klepon-bulang',
    title: 'Klepon bulang',
    kecamatan: 'Prambon',
    category: 'Gastronomi & Olahan Pangan',
    address: 'Jl. Raya Prambon, Bulang, Kec. Prambon, Kabupaten Sidoarjo, Jawa Timur 61264',
    koordinatText: 'Koordinat grafis: -7.4927, 112.5997',
    location: {
      name: 'Jl. Raya Prambon, Bulang, Kec. Prambon',
      kecamatan: 'Prambon',
      lat: -7.4927,
      lng: 112.5997,
    },
    content: 'Klepon Bulang merupakan makanan tradisional khas Desa Bulang, Kecamatan Prambon, Kabupaten Sidoarjo, Jawa Timur. Jajanan ini terbuat dari tepung ketan yang diisi gula merah dan memiliki tekstur kenyal dengan cita rasa manis. Ciri khas Klepon Bulang terletak pada bentuknya yang sedikit meruncing serta penyajian parutan kelapa secara terpisah. Selain menjadi kuliner khas daerah, Klepon Bulang juga menjadi identitas lokal dan salah satu sumber penghasilan masyarakat setempat (Nisya, 2023).',
    source: 'Nisya, 2023.',
    createdAt: 1710000010000,
  },

  // 11. SEDATI - Reog Cemandi
  {
    id: 'sedati-reog-cemandi',
    title: 'Reog Cemandi',
    kecamatan: 'Sedati',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Mbah Nanggul RT. 15 RW. 04, Desa Cemandi, Kecamatan Sedati, Kabupaten Sidoarjo, Jawa Timur',
    koordinatText: 'Koordinat grafis: -7.3951, 112.7915',
    location: {
      name: 'Jl. Mbah Nanggul RT. 15 RW. 04, Desa Cemandi, Sedati',
      kecamatan: 'Sedati',
      lat: -7.3951,
      lng: 112.7915,
    },
    content: 'Reog Cemandi adalah seni tradisional yang berasal dari Desa Cemandi, Kecamatan Sedati, Kabupaten Sidoarjo, yang dulunya dipergunakan sebagai alat perjuangan masyarakat dalam melawan penjajahan Belanda. Dengan berjalannya waktu, seni ini berubah fungsi menjadi sarana hiburan bagi masyarakat, pendukung acara pernikahan, ruwatan, serta pertunjukan dalam festival budaya. Reog Cemandi juga menjadi elemen penting dari kebijaksanaan lokal Sidoarjo yang harus dilestarikan sebagai warisan budaya daerah (Maskurin et al., 2023).',
    source: 'Maskurin et al., 2023.',
    createdAt: 1710000011000,
  },

  // 12. SEDATI - Tari Banjar Kemuning
  {
    id: 'sedati-tari-banjar-kemuning',
    title: 'Tari Banjar Kemuning',
    kecamatan: 'Sedati',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Kemuning Asri, Tropodo Kulon, Tropodo, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256',
    koordinatText: 'Titik koordinat: -7.3592, 112.7601',
    location: {
      name: 'Banjar Kemuning / Jl. Kemuning Asri, Tropodo Kulon',
      kecamatan: 'Sedati',
      lat: -7.3592,
      lng: 112.7601,
    },
    content: 'Tari Banjar Kemuning adalah seni tari yang asli dari Kabupaten Sidoarjo, diciptakan oleh Agustinus Heri Sugianto pada tahun 1999. Tarian ini melukiskan usaha seorang istri dari seorang nelayan yang dengan sepenuh hati berusaha memenuhi kebutuhan keluarganya, serta memanjatkan doa untuk keselamatan dan kelancaran suaminya saat mencari nafkah di lautan. Gerakan tari ini juga terinspirasi oleh tradisi Petik Laut yang dijalankan oleh masyarakat pesisir, sebagai wujud syukur kepada Tuhan atas keberkahan rezeki dan hasil laut yang melimpah (Pratama & Islam, 2023).',
    source: 'Pratama & Islam, 2023.',
    createdAt: 1710000012000,
  },

  // 13. SIDOARJO PUSAT - Batik Jetis
  {
    id: 'sidoarjo-batik-jetis',
    title: 'Batik Jetis',
    kecamatan: 'Sidoarjo',
    category: 'Industri Kreatif & UMKM',
    address: 'Jl. P. Diponegoro, Lemahputro, Kecamatan Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61213',
    koordinatText: 'Koordinat geografis: -7.4537711737394, 112.71005339084',
    location: {
      name: 'Jl. P. Diponegoro, Lemahputro, Sidoarjo',
      kecamatan: 'Sidoarjo',
      lat: -7.4537711737394,
      lng: 112.71005339084,
    },
    content: 'Batik Jetis adalah seni batik tulis yang unik dari Kabupaten Sidoarjo, tepatnya berasal dari Desa Jetis. Kerajinan ini telah ada dan terus diteruskan secara tradisional sejak tahun 1675, menjadi bagian penting dari warisan budaya yang harus dijaga. Selain memiliki makna budaya, Batik Jetis juga berfungsi sebagai industri kreatif yang dapat menciptakan kesempatan kerja serta meningkatkan penghasilan masyarakat di sekitar (Mawardi & Amanulloh, 2024).',
    source: 'Mawardi & Amanulloh, 2024.',
    createdAt: 1710000013000,
  },

  // 14. SIDOARJO PUSAT - Lelang Bandeng
  {
    id: 'sidoarjo-lelang-bandeng',
    title: 'Lelang Bandeng',
    kecamatan: 'Sidoarjo',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Jenderal Ahmad Yani, Alun-alun, Sidokumpul, Kecamatan Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61212',
    koordinatText: 'Koordinat geografis: 7°26\'51.0"S 112°43\'03.4"E (-7.4475, 112.7176)',
    location: {
      name: 'Jl. Jenderal Ahmad Yani, Alun-alun, Sidokumpul',
      kecamatan: 'Sidoarjo',
      lat: -7.4475,
      lng: 112.7176,
    },
    content: 'Lelang Bandeng Sidoarjo adalah suatu tradisi yang berasal dari budaya setempat yang mencakup aktivitas lelang ikan bandeng, dengan penimbangan sebagai tahap krusial dalam prosesnya. Tradisi ini juga menggambarkan kebijaksanaan lokal masyarakat Sidoarjo yang berfungsi sebagai alat untuk pendidikan serta pelestarian budaya wilayah (Amanda & Rahmawati, 2025).',
    source: 'Amanda & Rahmawati, 2025.',
    createdAt: 1710000014000,
  },

  // 15. SUKODONO
  {
    id: 'sukodono-desa-anggaswangi',
    title: 'Desa Anggaswangi',
    kecamatan: 'Sukodono',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Putra Bangsa RT 09 RW 05, Desa Anggaswangi, Kecamatan Sukodono, Kabupaten Sidoarjo, Jawa Timur, Kodepos: 61258',
    koordinatText: 'Koordinat geografis: -7.41861°S, 112.68528°E',
    location: {
      name: 'Jl. Putra Bangsa RT 09 RW 05, Desa Anggaswangi',
      kecamatan: 'Sukodono',
      lat: -7.41861,
      lng: 112.68528,
    },
    content: 'Desa Anggaswangi terletak di Kecamatan Sukodono, Kabupaten Sidoarjo, Jawa Timur. Penduduk Desa Anggaswangi menerapkan prinsip persatuan lewat aktivitas gotong royong yang menunjukkan rasa kebersamaan, kepedulian terhadap sesama, dan kolaborasi di antara warga dalam upaya membangun lingkungan desa yang bersih, sehat, serta nyaman (Amirulloh et al., 2023).',
    source: 'Amirulloh et al., 2023.',
    createdAt: 1710000015000,
  },

  // 16. TAMAN
  {
    id: 'taman-batik-khas-wage',
    title: 'Batik khas wage (Gikwatun)',
    kecamatan: 'Taman',
    category: 'Industri Kreatif & UMKM',
    address: 'Jl. Jambu No. 07, Desa Wage, Kecamatan Taman, Kabupaten Sidoarjo (dapat dilihat melalui akun resmi GikWatun (Batik Tulis Wage))',
    koordinatText: 'Koordinat geografis: [-7.370094, 112.708967]',
    location: {
      name: 'Jl. Jambu No. 07, Desa Wage, Taman',
      kecamatan: 'Taman',
      lat: -7.370094,
      lng: 112.708967,
    },
    content: 'Kecamatan Taman ternyata memiliki produk batik yang cantik dan unik. Batik Gikwatun dari Desa Wage. Cantiknya bisa dilihat dari guratan motifnya yg sederhana dengan paduan warna yang eksotik. Batik ini menjadi sangat unik dan khas karena proses membatiknya dilakukan di atas gunung sehingga unsur alam bisa terserap sempurna dalam hasil batikannya.',
    source: 'https://taman.sidoarjokab.go.id/001/1631410944',
    createdAt: 1710000016000,
  },

  // 17. TANGGULANGIN
  {
    id: 'tanggulangin-kerajinan-intako',
    title: 'Kerajinan Intako',
    kecamatan: 'Tanggulangin',
    category: 'Industri Kreatif & UMKM',
    address: 'Jl. Utama Kendensari No.27, Nggodong, Kedensari, Kecamatan Tanggulangin, Kabupaten Sidoarjo, Jawa Timur 61272',
    koordinatText: 'Koordinat geografis: -7.5053, 112.6922',
    location: {
      name: 'Jl. Utama Kendensari No.27, Nggodong, Kedensari',
      kecamatan: 'Tanggulangin',
      lat: -7.5053,
      lng: 112.6922,
    },
    content: 'INTAKO ialah kepanjangan dari Industri Tas dan Koper, yang merupakan pusat kerajinan terletak di Kecamatan Tanggulangin, Kabupaten Sidoarjo, Jawa Timur. Di INTAKO, berbagai produk dihasilkan dari kulit asli dan sintetis, antara lain tas, koper, dompet, sepatu, ikat pinggang, dan jaket. Industri ini tumbuh berkat keahlian para pengrajin dalam memproses bahan dan menciptakan berbagai desain produk yang memiliki nilai ekonomi serta mampu bersaing di pasar (Nuzulaturrayhan et al., 2025).',
    source: 'Nuzulaturrayhan et al., 2025.',
    createdAt: 1710000017000,
  },

  // 18. TARIK
  {
    id: 'tarik-tari-ujung',
    title: 'Tari Ujung',
    kecamatan: 'Tarik',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Raya Tarik No.1, Mergosari, Tarik, Kabupaten Sidoarjo, Jawa Timur 61265',
    koordinatText: 'Koordinat: 7°27′32″S 112°31′02″E (-7.4589, 112.5172) - Pusat budaya',
    location: {
      name: 'Jl. Raya Tarik No.1, Mergosari, Tarik',
      kecamatan: 'Tarik',
      lat: -7.4589,
      lng: 112.5172,
    },
    content: 'Tari Ujung adalah bentuk seni tari tradisional yang berasal dari Desa Tarik, Kabupaten Sidoarjo, di Jawa Timur. Kesenian ini telah ada sejak tahun 1942 dan berfungsi sebagai wadah untuk mengalirkan semangat para pemuda lewat kegiatan seni, sekaligus membantu mengurangi konflik antar dusun. Tari Ujung lebih menekankan pada gerakan tari atau joget ketimbang unsur pertumbukannya. Selain berfungsi sebagai hiburan, kesenian ini memiliki nilai kebersamaan, keberanian, dan kerukunan yang turut memperkuat interaksi sosial di dalam masyarakat lokal (Rizqi, 2024).',
    source: 'Rizqi, 2024.',
    createdAt: 1710000018000,
  },

  // 19. TULANGAN
  {
    id: 'tulangan-batik-tulis-sari-kenongo',
    title: 'Batik Tulis Sari Kenongo',
    kecamatan: 'Tulangan',
    category: 'Industri Kreatif & UMKM',
    address: 'Jl. Raya Kenongo No.5, RT. 001, Desa Kenongo, Kecamatan Tulangan, Kabupaten Sidoarjo, Jawa Timur 61273',
    koordinatText: 'Koordinat grafis: -7.461947, 112.637021',
    location: {
      name: 'Jl. Raya Kenongo No.5, RT. 001, Desa Kenongo',
      kecamatan: 'Tulangan',
      lat: -7.461947,
      lng: 112.637021,
    },
    content: 'Batik Tulis Sari Kenongo adalah jenis batik yang berasal dari Sidoarjo dan ditemukan di Desa Kenongo, Kecamatan Tulangan. Desain batik ini terpengaruh oleh flora yang ada di sekitar, seperti bunga sirih sunduk kentang, kembang bayem, dan kembang tebu. Setiap desainnya memiliki makna filosofis yang menggambarkan kebijaksanaan lokal serta identitas warga setempat. Keistimewaan ini menjadikan Batik Tulis Sari Kenongo sebagai salah satu warisan budaya yang penting untuk dilindungi dan dijaga (Sulistriyaniva et al., 2024).',
    source: 'Sulistriyaniva et al., 2024.',
    createdAt: 1710000019000,
  },

  // 20. WARU - Pepelegi Lawas
  {
    id: 'waru-pepelegi-lawas',
    title: 'Pepelegi lawas atau bazar tradisional nuansa tempo dulu',
    kecamatan: 'Waru',
    category: 'Seni Budaya & Tradisi',
    address: 'Jl. Jatisari No.1, Legi, Pepelegi, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256',
    koordinatText: 'Koordinat grafis: -7.361958, 112.723825',
    location: {
      name: 'Jl. Jatisari No.1, Legi, Pepelegi, Waru',
      kecamatan: 'Waru',
      lat: -7.361958,
      lng: 112.723825,
    },
    content: 'Pepelegi Lawas adalah kegiatan yang mengembalikan suasana kehidupan masa lalu sebagai upaya memperkenalkan identitas lokal warga Desa Pepelegi, Kecamatan Waru, Kabupaten Sidoarjo. Kegiatan ini berfungsi sebagai media untuk mengenalkan nilai-nilai budaya dan memperkuat hubungan antargenerasi agar warisan lokal tetap dikenal oleh masyarakat (Dwitama et al., 2023).',
    source: 'Dwitama et al., 2023.',
    createdAt: 1710000020000,
  },

  // 21. WARU - Kerajinan Sepatu
  {
    id: 'waru-kerajinan-sepatu',
    title: 'Kerajinan Sepatu',
    kecamatan: 'Waru',
    category: 'Industri Kreatif & UMKM',
    address: 'Jl. Kolonel Sugiono No. 45, Ngingas, Kecamatan Waru, Kabupaten Sidoarjo, Jawa Timur 61256',
    koordinatText: 'Koordinat grafis: -7.355, 112.736',
    location: {
      name: 'Jl. Kolonel Sugiono No. 45, Ngingas (Wedoro), Waru',
      kecamatan: 'Waru',
      lat: -7.355,
      lng: 112.736,
    },
    content: 'Pembuatan sepatu dan sandal adalah salah satu jenis industri kreatif yang tumbuh di Desa Wedoro, Kecamatan Waru, Kabupaten Sidoarjo. Kegiatan kerajinan ini sudah ada cukup lama dan telah berkembang dalam jumlah perajin serta hasil produksinya. Industri itu menjadi elemen dari potensi ekonomi lokal karena mampu memproduksi barang untuk dipasarkan secara luas, termasuk ke luar negeri (Judiono et al., 2023).',
    source: 'Judiono et al., 2023.',
    createdAt: 1710000021000,
  },

  // 22. WONOAYU
  {
    id: 'wonoayu-candi-dermo',
    title: 'Candi Dermo',
    kecamatan: 'Wonoayu',
    category: 'Sejarah & Cagar Budaya',
    address: 'Dusun Candidermo, RT.04/RW.03, Desa Candinegoro, Kecamatan Wonoayu, Kabupaten Sidoarjo, Jawa Timur 61261',
    koordinatText: 'Koordinat grafis: 7.4388256843596, 112.70621016078',
    location: {
      name: 'Dusun Candidermo, Desa Candinegoro, Wonoayu',
      kecamatan: 'Wonoayu',
      lat: -7.4388256843596,
      lng: 112.70621016078,
    },
    content: 'Candi Dermo adalah situs bersejarah warisan Kerajaan Majapahit yang berada di Desa Candinegoro, Kecamatan Wonoayu, Kabupaten Sidoarjo. Struktur ini berupa Gapura Paduraksa yang berfungsi sebagai gerbang menuju area suci bagi umat Hindu di masa lalu. Candi Dermo diperkirakan didirikan pada tahun 1353 di bawah pimpinan Adipati Terung dan memiliki nilai budaya serta sejarah yang penting sebagai bagian dari identitas lokal Sidoarjo (Izza et al., 2026).',
    source: 'Izza et al., 2026.',
    createdAt: 1710000022000,
  },
];
