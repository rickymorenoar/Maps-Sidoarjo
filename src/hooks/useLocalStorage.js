import { useState, useEffect } from 'react';

/**
 * Custom hook untuk membaca dan menyimpan data ke localStorage dengan aman.
 * @template T
 * @param {string} key Kunci localStorage
 * @param {T} initialValue Nilai fallback jika data kosong atau corrupt
 * @returns {[T, (value: T | ((prev: T) => T)) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Gagal mem-parse data localStorage untuk key "${key}":`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Gagal menyimpan data ke localStorage untuk key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
