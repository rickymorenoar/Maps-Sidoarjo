import { LocationPoint, KecamatanInfo } from '../types/memory';

/**
 * Titik tengah Kabupaten Sidoarjo (Alun-Alun)
 */
export const SIDOARJO_CENTER: [number, number] = [-7.4469, 112.7183];

export const DEFAULT_ZOOM = 11;
export const FOCUS_ZOOM = 14;

/**
 * Batas wilayah geografis ketat Kabupaten Sidoarjo (SouthWest to NorthEast).
 * Peta dikunci pada koordinat ini sehingga pengguna tidak bisa menggeser keluar dari Sidoarjo.
 */
export const SIDOARJO_BOUNDS: [[number, number], [number, number]] = [
  [-7.615, 112.43], // Batas Barat Daya (Tarik, Porong, Jabon)
  [-7.325, 112.92], // Batas Timur Laut (Waru, Sedati, Selat Madura)
];

export const MIN_ZOOM = 11; // Mencegah zoom out keluar dari area Sidoarjo
export const MAX_ZOOM = 18;

export const STORAGE_KEY_MATERI = 'sidoarjo_materi_kecamatan_v8';
export const STORAGE_KEY_MEMORIES = STORAGE_KEY_MATERI;

/**
 * Daftar lengkap 18 Kecamatan di Kabupaten Sidoarjo beserta koordinat pusatnya.
 */
export const KECAMATAN_LIST: KecamatanInfo[] = [
  { name: 'Sidoarjo', lat: -7.4478, lng: 112.7183, description: 'Pusat pemerintahan dan Alun-Alun' },
  { name: 'Buduran', lat: -7.4267, lng: 112.7208, description: 'Museum Mpu Tantular dan sentra industri' },
  { name: 'Candi', lat: -7.4789, lng: 112.7142, description: 'Sentra olahan bebek dan kawasan cagar budaya' },
  { name: 'Porong', lat: -7.5317, lng: 112.6864, description: 'Candi Pari dan kawasan geologi tanggul' },
  { name: 'Tanggulangin', lat: -7.5028, lng: 112.7186, description: 'Sentra industri kriya kulit terpadu' },
  { name: 'Jabon', lat: -7.575, lng: 112.825, description: 'Muara Tlocor, Pulau Sarinah, dan mangrove' },
  { name: 'Krembung', lat: -7.5256, lng: 112.6178, description: 'Agrikultur tebu dan peninggalan sejarah PG' },
  { name: 'Prambon', lat: -7.475, lng: 112.5722, description: 'Kawasan persawahan dan agraris barat' },
  { name: 'Tulangan', lat: -7.4708, lng: 112.6514, description: 'Sentra industri gula dan pertanian' },
  { name: 'Wonoayu', lat: -7.4339, lng: 112.6247, description: 'Situs Candi Dermo dan perkampungan tua' },
  { name: 'Krian', lat: -7.4061, lng: 112.5794, description: 'Simpul perdagangan sungai dan industri barat' },
  { name: 'Balongbendo', lat: -7.4106, lng: 112.5089, description: 'Kawasan perbatasan barat dan agrikultur' },
  { name: 'Tarik', lat: -7.4361, lng: 112.5167, description: 'Sentra kerupuk samiler dan stasiun percabangan' },
  { name: 'Sukodono', lat: -7.4039, lng: 112.6861, description: 'Sentra UMKM kerajinan dan pemukiman' },
  { name: 'Taman', lat: -7.3625, lng: 112.6986, description: 'Kawasan industri Sepanjang dan sejarah perkeretaapian' },
  { name: 'Waru', lat: -7.3541, lng: 112.7289, description: 'Gerbang utara, simpul logistik dan transportasi' },
  { name: 'Gedangan', lat: -7.3912, lng: 112.7265, description: 'Sentra industri olahan kerupuk dan logam' },
  { name: 'Sedati', lat: -7.3756, lng: 112.7844, description: 'Pesisir tambak bandeng, kupang, dan bandara' },
];

export const DEFAULT_LOCATION: LocationPoint = {
  name: 'Pusat Kabupaten Sidoarjo',
  kecamatan: 'Sidoarjo',
  lat: -7.4469,
  lng: 112.7183,
};
