import { GAZETTEER } from './gazetteer';
import { CATEGORIES, DEFAULT_CATEGORY } from './categories';
import { DEFAULT_LOCATION, KECAMATAN_LIST } from './constants';
import { AnalysisResult, LocationPoint } from '../types/memory';

/**
 * Normalisasi teks: huruf kecil, bersihkan karakter spesial berlebih.
 */
export function normalizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Buat judul materi ringkas jika pengguna tidak mengisi judul spesifik.
 */
export function generateTitle(text: string): string {
  if (!text || typeof text !== 'string') return 'Materi Kecamatan Sidoarjo';

  const clean = text.trim();
  const firstLine = clean.split(/\r?\n/)[0].trim();
  const firstSentence = firstLine.split(/[.!?]/)[0].trim();
  const candidate = firstSentence || firstLine;

  if (candidate.length <= 50) {
    return candidate;
  }

  const truncated = candidate.slice(0, 48);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

function createIndonesianPattern(keyword: string): RegExp {
  const escaped = keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (escaped.includes(' ')) {
    return new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`, 'gi');
  }
  if (escaped.length <= 3) {
    return new RegExp(`\\b${escaped}(?:nya)?\\b`, 'gi');
  }
  return new RegExp(`\\b(?:me[mn]|meng|ber|di|ter|pe[mnr]?|se)?${escaped}(?:an|i|kan|nya)?\\b`, 'gi');
}

/**
 * Analisis teks materi: deteksi kecamatan dan kategori materi edukasi.
 */
export function analyzeStory(text: string): AnalysisResult {
  const normalized = normalizeText(text);

  if (!normalized) {
    return {
      kecamatan: 'Sidoarjo',
      location: { ...DEFAULT_LOCATION, isDefault: true },
      category: DEFAULT_CATEGORY,
      matchedKeywords: { kecamatan: [], category: [] },
      isDefaultLocation: true,
      message: 'Materi belum memuat teks untuk dianalisis.',
    };
  }

  // 1. Deteksi Entitas Kecamatan dari Gazetteer & Daftar Kecamatan
  let bestLocation: LocationPoint | null = null;
  let detectedKecamatan = 'Sidoarjo';
  let highestLocScore = -1;
  const matchedLocKeywords = new Set<string>();

  // Cek pencocokan eksplisit nama kecamatan
  for (const kec of KECAMATAN_LIST) {
    const kecRegex = new RegExp(`\\b(?:kecamatan\\s+)?${kec.name.toLowerCase()}\\b`, 'gi');
    if (kecRegex.test(normalized)) {
      matchedLocKeywords.add(kec.name);
      highestLocScore = 1000;
      detectedKecamatan = kec.name;
      bestLocation = {
        name: `Kecamatan ${kec.name}`,
        kecamatan: kec.name,
        lat: kec.lat,
        lng: kec.lng,
        isDefault: false,
      };
      break;
    }
  }

  // Jika belum cocok dengan nama kecamatan eksplisit, scan kata kunci gazetteer
  if (!bestLocation) {
    for (const entry of GAZETTEER) {
      let locMatchCount = 0;
      let earliestIndex = Infinity;
      let longestKeywordLength = 0;
      const currentEntryMatchedWords: string[] = [];

      for (const kw of entry.keywords) {
        const regex = createIndonesianPattern(kw);
        let match: RegExpExecArray | null;

        while ((match = regex.exec(normalized)) !== null) {
          locMatchCount++;
          const matchIdx = match.index;
          if (matchIdx < earliestIndex) {
            earliestIndex = matchIdx;
          }
        }

        regex.lastIndex = 0;
        if (regex.test(normalized)) {
          currentEntryMatchedWords.push(kw);
          if (kw.length > longestKeywordLength) {
            longestKeywordLength = kw.length;
          }
        }
      }

      if (locMatchCount > 0) {
        const positionBonus = Math.max(0, 500 - Math.min(earliestIndex, 500));
        const score = (locMatchCount * 30) + (longestKeywordLength * 15) + positionBonus;

        if (score > highestLocScore) {
          highestLocScore = score;
          detectedKecamatan = entry.kecamatan;
          bestLocation = {
            name: entry.name,
            kecamatan: entry.kecamatan,
            lat: entry.lat,
            lng: entry.lng,
            isDefault: false,
          };
          matchedLocKeywords.clear();
          currentEntryMatchedWords.forEach(w => matchedLocKeywords.add(w));
        }
      }
    }
  }

  // 2. Deteksi Kategori Materi dari Kamus Kategori
  let bestCategory: string | null = null;
  let highestCatScore = -1;
  const matchedCatKeywords = new Set<string>();

  for (const cat of CATEGORIES) {
    let catMatchCount = 0;
    let earliestIndex = Infinity;
    let longestKeywordLength = 0;
    const currentCatMatchedWords: string[] = [];

    for (const kw of cat.keywords) {
      const regex = createIndonesianPattern(kw);
      let match: RegExpExecArray | null;

      while ((match = regex.exec(normalized)) !== null) {
        catMatchCount++;
        const matchIdx = match.index;
        if (matchIdx < earliestIndex) {
          earliestIndex = matchIdx;
        }
      }

      regex.lastIndex = 0;
      if (regex.test(normalized)) {
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
  const finalLocation: LocationPoint = bestLocation || { ...DEFAULT_LOCATION, isDefault: true };
  const finalCategory = bestCategory || DEFAULT_CATEGORY;

  let message = '';
  if (isDefaultLocation && finalCategory === DEFAULT_CATEGORY) {
    message = 'Kecamatan spesifik belum terdeteksi dari teks, disematkan sementara di Pusat Kabupaten Sidoarjo.';
  } else if (isDefaultLocation) {
    message = `Kategori terdeteksi sebagai "${finalCategory}". Lokasi disematkan di Pusat Kabupaten Sidoarjo.`;
  } else {
    message = `Materi terhubung ke Kecamatan ${detectedKecamatan} dengan kategori "${finalCategory}".`;
  }

  return {
    kecamatan: detectedKecamatan,
    location: finalLocation,
    category: finalCategory,
    matchedKeywords: {
      kecamatan: Array.from(matchedLocKeywords),
      category: Array.from(matchedCatKeywords),
    },
    isDefaultLocation,
    message,
  };
}
