/**
 * Contoh memori awal (seed memories) yang mewakili memori kolektif Sidoarjo.
 */

export const SEED_MEMORIES = [
  {
    id: 'seed-1',
    title: 'Aroma Malam dan Goresan Canting di Jetis',
    story: 'Waktu kecil setiap liburan diajak simbah ke Kampung Batik Jetis. Di teras rumah-rumah tua, ibu-ibu sibuk meniup canting dan menorehkan cairan malam ke kain mori putih. Aroma lilin malam yang khas selalu mengingatkan saya pada ketenangan gang-gang di Sidoarjo.',
    location: {
      name: 'Kampung Batik Jetis',
      lat: -7.4528,
      lng: 112.7214,
    },
    category: 'Tradisi Kriya & Kerajinan',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 hari lalu
  },
  {
    id: 'seed-2',
    title: 'Bata Merah Candi Pari yang Bertahan',
    story: 'Berdiri di depan Candi Pari di Porong saat matahari condong ke barat selalu memberi rasa hening. Konon dibangun zaman Hayam Wuruk, susunan bata merahnya yang tebal seolah menjadi saksi bisu ratusan tahun perjalanan tanah Delta ini.',
    location: {
      name: 'Candi Pari, Porong',
      lat: -7.5317,
      lng: 112.6864,
    },
    category: 'Arsitektur & Purbakala',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 hari lalu
  },
  {
    id: 'seed-3',
    title: 'Sepiring Lontong Kupang dan Angin Tambak Sedati',
    story: 'Tidak ada yang mengalahkan gurihnya petis hitam dan perasan jeruk nipis di lontong kupang tepi tambak Sedati. Sambil makan sate kerang, kami memandang tambak bandeng luas dengan burung-burung kuntul putih yang beterbangan rendah.',
    location: {
      name: 'Tambak Pesisir & Kuliner Sedati',
      lat: -7.3756,
      lng: 112.7844,
    },
    category: 'Gastronomi & Kuliner Tradisi',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 hari lalu
  },
  {
    id: 'seed-4',
    title: 'Berburu Tas Kulit di Tanggulangin Jelang Lebaran',
    story: 'Tradisi keluarga tiap akhir Ramadhan adalah mampir ke pusat kerajinan kulit Tanggulangin. Ayah mencari dompet kulit asli, sementara ibu memilih tas jinjing di Intako. Ruas jalan selalu ramai dengan aroma khas lem dan olahan kulit sapi.',
    location: {
      name: 'Sentra Kerajinan Kulit Tanggulangin',
      lat: -7.5028,
      lng: 112.7186,
    },
    category: 'Tradisi Kriya & Kerajinan',
    createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 jam lalu
  },
  {
    id: 'seed-5',
    title: 'Mengenang Kampung yang Kini Sunyi di Balik Tanggul Porong',
    story: 'Kadang saya sengaja naik ke tanggul lumpur Porong hanya untuk menatap hamparan tanah luas yang dulu adalah rumah masa kecil kakek saya di Jatirejo. Meski wujud fisiknya telah hilang, ingatan tentang senja dan pohon mangga di halaman rumah itu tak pernah surut.',
    location: {
      name: 'Kawasan Tanggul Lumpur Porong',
      lat: -7.5283,
      lng: 112.7122,
    },
    category: 'Memori Sosial & Peristiwa',
    createdAt: Date.now() - 1000 * 60 * 60 * 4, // 4 jam lalu
  },
];
