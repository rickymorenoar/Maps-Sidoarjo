import { CategoryItem } from '../types/memory';

/**
 * Kamus Kategori Materi Edukasi Kecamatan di Sidoarjo
 */
export const CATEGORIES: CategoryItem[] = [
  {
    name: 'Sejarah & Cagar Budaya',
    color: '#7D4F27',
    keywords: [
      'candi',
      'purbakala',
      'museum',
      'tantular',
      'majapahit',
      'kolonial',
      'sejarah',
      'prasasti',
      'situs',
      'klenteng',
      'makam',
      'gapura',
    ],
  },
  {
    name: 'Industri Kreatif & UMKM',
    color: '#B4532A', // clay
    keywords: [
      'kulit',
      'tanggulangin',
      'batik',
      'jetis',
      'tas',
      'kriya',
      'umkm',
      'kerajinan',
      'anyaman',
      'intako',
      'perajin',
      'industri',
    ],
  },
  {
    name: 'Perikanan & Ekologi Pesisir',
    color: '#2F6F6A', // tambak
    keywords: [
      'tambak',
      'bandeng',
      'udang',
      'kupang',
      'mangrove',
      'pesisir',
      'sedati',
      'tlocor',
      'ekologi',
      'nelayan',
      'muara',
      'perairan',
    ],
  },
  {
    name: 'Geografi & Fenomena Alam',
    color: '#4A6267',
    keywords: [
      'geologi',
      'lumpur',
      'lapindo',
      'delta',
      'sungai',
      'brantas',
      'kali porong',
      'kali mas',
      'aluvial',
      'sedimen',
      'tanah',
      'tanggul',
    ],
  },
  {
    name: 'Gastronomi & Olahan Pangan',
    color: '#C67A26',
    keywords: [
      'lontong kupang',
      'petis',
      'kerupuk',
      'telur asin',
      'bandeng asap',
      'samiler',
      'kuliner',
      'pangan',
      'gedangan',
      'olahan',
      'kebonsari',
    ],
  },
  {
    name: 'Infrastruktur & Tata Ruang',
    color: '#8C3D38',
    keywords: [
      'stasiun',
      'terminal',
      'purabaya',
      'waru',
      'alun-alun',
      'pemerintahan',
      'transportasi',
      'logistik',
      'kawasan',
      'jaringan',
    ],
  },
];

export const DEFAULT_CATEGORY = 'Materi Umum';
