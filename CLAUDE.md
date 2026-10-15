# CLAUDE.md — Sidoarjo Memory Map

Panduan untuk Claude saat bekerja di repositori ini. Baca seluruhnya sebelum menulis kode.

## 1. Ringkasan Proyek

**Sidoarjo Memory Map** adalah website *single page* untuk memetakan ingatan kolektif dan warisan budaya Sidoarjo. Pengguna menulis cerita bebas, lalu aplikasi (simulasi NLP berbasis aturan, tanpa API AI sungguhan) mendeteksi lokasi dan kategori budayanya, kemudian menancapkan penanda di peta.

Struktur halaman (satu halaman, scroll antar section):

1. **Home** — hero singkat + aplikasi peta ingatan (peta, form cerita, daftar titik).
2. **About** — tentang proyek dan cara kerjanya.
3. **Contact** — form yang mengirim pesan ke email pemilik.
4. **Footer** — tampil di dasar halaman, **tidak** ada di navbar.

Navbar hanya berisi tiga tautan: Home, About, Contact.

## 2. Tech Stack

| Kebutuhan | Pilihan |
|---|---|
| Build tool | Vite |
| UI | React 18 (functional component + hooks, JavaScript) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Peta | Leaflet + `react-leaflet` (tile OpenStreetMap) |
| Animasi | `framer-motion` (scroll reveal, transisi) + CSS keyframes untuk efek kecil |
| Kirim email | `@emailjs/browser` (tanpa backend) |
| Penyimpanan | `localStorage` lewat custom hook |

Jangan menambah dependency baru tanpa alasan jelas. Tidak memakai Redux, router, atau UI kit (MUI, shadcn, dsb).

## 3. Struktur Folder

```
sidoarjo-memory-map/
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                  # menyusun semua section dalam satu halaman
    ├── index.css                # @import "tailwindcss" + @theme (token desain) + font
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx       # Home / About / Contact saja
    │   │   └── Footer.jsx       # di luar navbar
    │   ├── sections/
    │   │   ├── Home.jsx         # hero + MemoryApp
    │   │   ├── About.jsx
    │   │   └── Contact.jsx
    │   ├── memory/
    │   │   ├── MemoryApp.jsx    # state utama: daftar memori, titik terpilih
    │   │   ├── MemoryMap.jsx    # MapContainer, TileLayer, Marker, Popup, flyTo
    │   │   ├── MemoryForm.jsx   # textarea + tombol + validasi
    │   │   └── MemoryList.jsx   # daftar titik di panel samping
    │   └── ui/
    │       ├── Reveal.jsx       # wrapper animasi muncul saat scroll
    │       └── Button.jsx
    │
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useActiveSection.js  # menandai link navbar aktif saat scroll
    │
    ├── lib/
    │   ├── nlp.js               # analyzeStory(): entitas lokasi + kategori
    │   ├── gazetteer.js         # kamus keyword -> nama lokasi + koordinat
    │   ├── categories.js        # keyword -> kategori warisan budaya
    │   └── constants.js         # SIDOARJO_CENTER, zoom default, kunci storage
    │
    └── data/
        └── seedMemories.js      # beberapa contoh memori awal
```

Aturan struktur: komponen tampilan di `components/`, logika murni (tanpa JSX) di `lib/`, state yang bisa dipakai ulang di `hooks/`. Satu komponen per file, nama file sama dengan nama komponen (PascalCase).

## 4. Fitur dan Cara Implementasi

### 4.1 Peta interaktif (`MemoryMap.jsx`)
- `MapContainer` dengan pusat `[-7.4469, 112.7183]` (Sidoarjo), zoom awal 11.
- `TileLayer` OpenStreetMap. Wajib mencantumkan atribusi OSM.
- Setiap memori dirender sebagai `Marker` + `Popup` (judul, kategori, potongan cerita).
- Saat item di daftar diklik atau memori baru ditambahkan, panggil `map.flyTo([lat, lng], 15, { duration: 1.2 })` lewat komponen kecil yang memakai `useMap()`.
- Import `leaflet/dist/leaflet.css`. Ikon marker default Leaflet sering rusak di Vite; gunakan `L.divIcon` custom (titik berdenyut dari CSS) agar sekaligus sesuai desain.

### 4.2 Simulasi NLP berbasis aturan (`lib/nlp.js`)
Fungsi utama: `analyzeStory(text) -> { location, category, matchedKeywords }`.

- Normalisasi: `toLowerCase()`, hapus tanda baca berlebih.
- **Entity recognition (simulasi):** cocokkan kata kunci dari `gazetteer.js` (`candi`, `batik`, `porong`, `tambak`, dst.) ke nama lokasi + koordinat. Jika beberapa cocok, pilih yang muncul paling awal atau paling banyak.
- **Kategorisasi otomatis:** cocokkan pola kata ke kategori di `categories.js` (contoh: `batik` -> "Tradisi Kriya").
- Jika tidak ada yang cocok, kembalikan lokasi default (pusat Sidoarjo) + kategori "Lainnya", dan beri tahu pengguna dengan pesan yang jelas.
- Fungsi ini **murni** (tanpa efek samping) agar mudah diuji.
- Koordinat di `gazetteer.js` adalah perkiraan awal. Verifikasi di peta sebelum dianggap final.

### 4.3 Penyimpanan data (`hooks/useLocalStorage.js`)
- Menyimpan array objek memori sebagai JSON di `localStorage` (kunci di `constants.js`).
- Bungkus `JSON.parse` dengan `try/catch`; jika data rusak, kembali ke `seedMemories`.
- Bentuk objek memori:

```js
{
  id: string,          // crypto.randomUUID()
  story: string,
  title: string,       // diturunkan dari kalimat pertama
  location: { name: string, lat: number, lng: number },
  category: string,
  createdAt: number    // Date.now()
}
```

### 4.4 Form memori (`MemoryForm.jsx`)
- `textarea` + tombol kirim. Teks kosong atau hanya spasi **tidak** dikirim; tampilkan pesan error inline di bawah field (bukan `alert()`).
- Setelah sukses: reset form, tambah memori, flyTo ke titik baru.

### 4.5 Daftar titik (`MemoryList.jsx`)
- Dirender dari state React (bukan manipulasi DOM langsung). Jangan pakai `innerHTML` atau `document.createElement`.
- Klik item memicu flyTo dan membuka popup marker terkait.

### 4.6 Navigasi satu halaman
- Setiap section punya `id` (`home`, `about`, `contact`). Navbar memakai tautan anchor dengan `scroll-behavior: smooth`.
- `useActiveSection` (IntersectionObserver) menandai link yang sedang aktif.
- Navbar sticky, ringkas; di mobile berubah menjadi menu sederhana (toggle).
- **Footer tidak boleh dimasukkan ke navbar** dan tidak punya tautan section sebagai pengganti navbar. Isi footer: nama proyek, atribusi OpenStreetMap, tahun, kontak singkat.

### 4.7 Contact form (`sections/Contact.jsx`)
- Field: nama, email pengirim, pesan.
- Pengiriman ke email pemilik memakai **EmailJS** (`emailjs.send`). Kredensial dibaca dari env:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

- Sediakan `.env.example`; **jangan** commit `.env`.
- Validasi: semua field wajib, format email valid. Tambahkan honeypot field tersembunyi untuk menahan bot sederhana.
- State pengiriman: `idle | sending | success | error`. Tombol dinonaktifkan saat `sending`. Tampilkan pesan sukses/gagal yang jelas di halaman.
- Alamat email pemilik diatur di template EmailJS, bukan di-hardcode di source.

## 5. Panduan Desain

Tujuan: **sederhana, hangat, punya karakter, dan bergerak halus.** Hindari tampilan generik buatan AI.

### 5.1 Hal yang dihindari (AI slop)
- Gradasi ungu-biru, glow neon, glassmorphism berlebihan.
- Hero tengah dengan judul besar + dua tombol + tiga kartu fitur berderet yang identik.
- Emoji sebagai ikon, kartu dengan shadow tebal dan radius besar di mana-mana.
- Font default (Inter/Roboto/Arial) tanpa pertimbangan.
- Salinan teks klise ("Unlock the power of…", "Seamless experience", "Revolutionary").
- Animasi berlebihan yang mengganggu membaca.

### 5.2 Arah visual
- **Nuansa:** peta kertas hangat, tinta, dan tanah liat; terinspirasi batik dan tambak Sidoarjo, tanpa meniru pola secara literal.
- **Warna** (definisikan sebagai token di `@theme` pada `index.css`, jangan hardcode hex di komponen):
  - `paper` `#F4EFE6` (latar)
  - `ink` `#1E2A2E` (teks)
  - `clay` `#B4532A` (aksen utama, tombol, marker)
  - `tambak` `#2F6F6A` (aksen sekunder)
  - `line` `#D9D0BF` (garis tipis dan border)
- **Tipografi:** serif berkarakter untuk judul (mis. *Fraunces* atau *Instrument Serif*), sans bersih untuk isi (mis. *DM Sans*). Muat lewat `<link>` Google Fonts dengan fallback system font.
- **Bentuk:** garis tipis 1px, sudut kecil (`rounded-sm` atau `rounded-md`), layout asimetris dengan whitespace lega. Hindari kartu bertumpuk bayangan.
- **Ikon:** SVG sederhana buatan sendiri atau set konsisten; bukan emoji.
- Teks antarmuka dalam **Bahasa Indonesia**, nada hangat dan lugas.

### 5.3 Animasi (tetap ringan, tetap "cool")
- Judul hero muncul per baris (mask/slide-up) saat load.
- `Reveal.jsx`: elemen fade + naik 12–20px saat masuk viewport, sekali saja.
- Marker berdenyut pelan; popup dan item daftar muncul dengan transisi singkat.
- Peta berpindah dengan `flyTo`; garis pemisah section digambar bertahap.
- Hover tombol dan link: transisi warna/garis bawah 150–250ms.
- Hormati `prefers-reduced-motion`: matikan animasi non-esensial (gunakan `useReducedMotion` dari framer-motion).
- Animasi hanya memakai `transform` dan `opacity` agar tetap mulus.

### 5.4 Responsif
- Mobile-first dengan breakpoint Tailwind (`md:`, `lg:`). Di desktop: peta dan panel samping berdampingan; di mobile: bertumpuk, peta dulu (tinggi minimal ~60vh).
- Pastikan target sentuh minimal 44px dan kontras teks memadai.

## 6. Konvensi Kode

- JavaScript ES modules, functional component, hooks. Tanpa class component.
- Styling hanya dengan utility class Tailwind; CSS kustom hanya di `index.css` (token, keyframes, override Leaflet).
- Komponen kecil dan fokus; props jelas. Logika non-UI dipindah ke `lib/` atau `hooks/`.
- Nama: komponen `PascalCase`, fungsi/variabel `camelCase`, konstanta `UPPER_SNAKE_CASE`.
- Aksesibilitas: elemen semantik (`header`, `main`, `section`, `footer`, `nav`), `label` untuk setiap input, `aria-live` untuk status form, `alt`/`aria-label` yang bermakna, fokus terlihat.
- Jangan menulis komentar yang hanya mengulang isi kode; komentar menjelaskan *kenapa*.

## 7. Perintah

```bash
npm install
npm run dev       # server pengembangan Vite
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build
```

## 8. Aturan Kerja untuk Claude

1. Ikuti struktur folder di atas; jangan membuat folder atau pola baru tanpa alasan.
2. Kerjakan bertahap: kerangka dan token desain -> layout section -> peta -> NLP -> form memori -> contact -> animasi -> pemolesan.
3. Jangan mengirim atau menyimpan data pengguna ke server mana pun selain EmailJS pada form contact.
4. Jangan menaruh secret di source code atau di commit.
5. Setelah perubahan besar, pastikan `npm run build` lolos tanpa error.
6. Bila ada keputusan desain yang ambigu, pilih opsi yang lebih sederhana dan sesuai bagian 5.
7. Jangan menambah fitur di luar yang tertulis di sini tanpa konfirmasi dari pemilik proyek.
