/**
 * Tipe data TypeScript untuk sistem Peta Materi Kecamatan Sidoarjo
 */

export interface LocationPoint {
  name: string;
  kecamatan: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export interface MateriItem {
  id: string;
  title: string;
  kecamatan: string;
  content: string;
  category: string;
  location: LocationPoint;
  createdAt: number;
  source?: string;
  address?: string;
  koordinatText?: string;
}

// Alias untuk kompatibilitas kode
export type Memory = MateriItem;

export interface KecamatanInfo {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface GazetteerEntry {
  name: string;
  kecamatan: string;
  lat: number;
  lng: number;
  keywords: string[];
}

export interface CategoryItem {
  name: string;
  color: string;
  keywords: string[];
}

export interface AnalysisResult {
  kecamatan: string;
  location: LocationPoint;
  category: string;
  matchedKeywords: {
    kecamatan: string[];
    category: string[];
  };
  isDefaultLocation: boolean;
  message: string;
}

export interface FlyTarget {
  lat: number;
  lng: number;
  zoom?: number;
  timestamp?: number;
}
