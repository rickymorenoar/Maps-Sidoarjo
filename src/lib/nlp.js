import { GAZETTEER } from './gazetteer.js';
import { CATEGORIES, DEFAULT_CATEGORY } from './categories.js';
import { DEFAULT_LOCATION } from './constants.js';

/**
 * Normalisasi teks: huruf kecil, bersihkan tanda baca berlebih tapi jaga spasi dan kata.
 * @param {string} text 
 * @returns {string}
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Buat judul ringkas dari kalimat pertama cerita
 * @param {string} text 
 * @returns {string}
 */
export function generateTitle(text) {
  if (!text || typeof text !== 'string') return 'Cerita Tanpa Judul';

  const clean = text.trim();
  // Ambil baris pertama atau kalimat pertama
  const firstLine = clean.split(/\r?\n/)[0].trim();
  const firstSentence = firstLine.split(/[.!?]/)[0].trim();
  const candidate = firstSentence || firstLine;

  if (candidate.length <= 50) {
    return candidate;
  }

  // Potong di batas kata terdekat jika lebih dari 50 karakter
  const truncated = candidate.slice(0, 48);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

/**
 * Pola regex cerdas yang memahami imbuhan bahasa Indonesia (me-, ber-, di-, pe-, -an, -nya)
 * tanpa false positive pada kata pendek.
 * @param {string} keyword 
 * @returns {RegExp}
 */
function createIndonesianPattern(keyword) {
  const escaped = keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (escaped.includes(' ')) {
    // Frasa multi-kata seperti "candi pari", "lontong kupang", "batik jetis"
    return new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`, 'gi');
  }
  if (escaped.length <= 3) {
    // Kata pendek: cocokkan kata utuh atau bentuk jamak/klitika saja
    return new RegExp(`\\b${escaped}(?:nya)?\\b`, 'gi');
  }
  // Kata berakar >= 4 huruf: dukung awalan me-, ber-, di-, pe-, ter- dan akhiran -an, -i, -kan, -nya
  return new RegExp(`\\b(?:me[mn]|meng|ber|di|ter|pe[mnr]?|se)?${escaped}(?:an|i|kan|nya)?\\b`, 'gi');
}

/**
 * Analisis teks cerita: deteksi entitas lokasi dan kategori budaya secara murni (pure function).
 * 
 * @param {string} text Cerita yang diinputkan pengguna
 * @returns {{
 *   location: { name: string, lat: number, lng: number, isDefault?: boolean },
 *   category: string,
 *   matchedKeywords: { location: string[], category: string[] },
 *   isDefaultLocation: boolean,
 *   message: string
 * }}
 */
export function analyzeStory(text) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return {
      location: { ...DEFAULT_LOCATION, isDefault: true },
      category: DEFAULT_CATEGORY,
      matchedKeywords: { location: [], category: [] },
      isDefaultLocation: true,
      message: 'Cerita belum memuat teks untuk dianalisis.',
    };
  }

  // 1. Deteksi Entitas Lokasi dari Gazetteer
  let bestLocation = null;
  let highestLocScore = -1;
  const matchedLocKeywords = new Set();

  for (const entry of GAZETTEER) {
    let locMatchCount = 0;
    let earliestIndex = Infinity;
    let longestKeywordLength = 0;
    const currentEntryMatchedWords = [];

    for (const kw of entry.keywords) {
      const regex = createIndonesianPattern(kw);
      let match;
      let kwFound = false;

      while ((match = regex.exec(normalized)) !== null) {
        kwFound = true;
        locMatchCount++;
        const matchIdx = match.index;
        if (matchIdx < earliestIndex) {
          earliestIndex = matchIdx;
        }
      }

      if (kwFound) {
        currentEntryMatchedWords.push(kw);
        if (kw.length > longestKeywordLength) {
          longestKeywordLength = kw.length;
        }
      }
    }

    if (locMatchCount > 0) {
      // Bobot: frekuensi kemunculan + posisi kemunculan awal + bobot spesifisitas panjang kata kunci
      const positionBonus = Math.max(0, 500 - Math.min(earliestIndex, 500));
      const score = (locMatchCount * 30) + (longestKeywordLength * 15) + positionBonus;

      if (score > highestLocScore) {
        highestLocScore = score;
        bestLocation = {
          name: entry.name,
          lat: entry.lat,
          lng: entry.lng,
          isDefault: false,
        };
        matchedLocKeywords.clear();
        currentEntryMatchedWords.forEach(w => matchedLocKeywords.add(w));
      }
    }
  }

  // 2. Deteksi Kategori Budaya dari Kamus Kategori
  let bestCategory = null;
  let highestCatScore = -1;
  const matchedCatKeywords = new Set();

  for (const cat of CATEGORIES) {
    let catMatchCount = 0;
    let earliestIndex = Infinity;
    let longestKeywordLength = 0;
    const currentCatMatchedWords = [];

    for (const kw of cat.keywords) {
      const regex = createIndonesianPattern(kw);
      let match;
      let kwFound = false;

      while ((match = regex.exec(normalized)) !== null) {
        kwFound = true;
        catMatchCount++;
        const matchIdx = match.index;
        if (matchIdx < earliestIndex) {
          earliestIndex = matchIdx;
        }
      }

      if (kwFound) {
        currentCatMatchedWords.push(kw);
        if (kw.length > longestKeywordLength) {
          longestKeywordLength = kw.length;
        }
      }
    }

    if (catMatchCount > 0) {
      const positionBonus = Math.max(0, 300 - Math.min(earliestIndex, 300));
      const score = (catMatchCount * 25) + (longestKeywordLength * 10) + positionBonus;

      if (score > highestCatScore) {
        highestCatScore = score;
        bestCategory = cat.name;
        matchedCatKeywords.clear();
        currentCatMatchedWords.forEach(w => matchedCatKeywords.add(w));
      }
    }
  }

  const isDefaultLocation = !bestLocation;
  const finalLocation = bestLocation || { ...DEFAULT_LOCATION, isDefault: true };
  const finalCategory = bestCategory || DEFAULT_CATEGORY;

  let message = '';
  if (isDefaultLocation && finalCategory === DEFAULT_CATEGORY) {
    message = 'Lokasi dan kategori spesifik tidak terdeteksi, cerita disematkan di Titik Pusat Sidoarjo dengan kategori Lainnya.';
  } else if (isDefaultLocation) {
    message = `Kategori terdeteksi sebagai "${finalCategory}". Lokasi spesifik belum teridentifikasi sehingga ditempatkan di Pusat Sidoarjo.`;
  } else {
    message = `Berhasil mengenali lokasi "${finalLocation.name}" dan kategori "${finalCategory}".`;
  }

  return {
    location: finalLocation,
    category: finalCategory,
    matchedKeywords: {
      location: Array.from(matchedLocKeywords),
      category: Array.from(matchedCatKeywords),
    },
    isDefaultLocation,
    message,
  };
}
