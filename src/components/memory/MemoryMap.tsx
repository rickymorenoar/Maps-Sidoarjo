import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SIDOARJO_CENTER, DEFAULT_ZOOM, FOCUS_ZOOM, SIDOARJO_BOUNDS, MIN_ZOOM, MAX_ZOOM } from '../../lib/constants';
import { MateriItem, FlyTarget } from '../../types/memory';

// Pengaman aset default Leaflet agar tidak error pada bundler Vite
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createMarkerIcon(isActive = false): L.DivIcon {
  return L.divIcon({
    className: 'custom-memory-marker',
    html: `
      <div class="marker-pin ${isActive ? 'marker-active' : ''}">
        <div class="marker-pulse"></div>
        <div class="marker-core"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

interface MapFlyControllerProps {
  target: FlyTarget | null;
}

function MapFlyController({ target }: MapFlyControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (target && typeof target.lat === 'number' && typeof target.lng === 'number') {
      map.flyTo([target.lat, target.lng], target.zoom || FOCUS_ZOOM, {
        duration: 1.2,
      });
    }
  }, [target, map]);

  return null;
}

/**
 * Memastikan Leaflet menghitung ulang ukuran kontainer dan membatasi pergerakan ketat di Sidoarjo
 */
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    map.setMaxBounds(SIDOARJO_BOUNDS);

    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map]);

  return null;
}

/**
 * Komponen Kotak Adaptif Cerdas:
 * Menampilkan preview kotak di dekat titik marker.
 * Muncul di atas secara default; bila terpotong atas -> muncul di bawah;
 * bila terpotong bawah -> muncul di kanan; bila terpotong kanan -> muncul di kiri.
 * Dilengkapi foto dokumentasi responsif dan tombol aksi "Lihat Materi Lengkap".
 */
interface SmartAdaptiveCardProps {
  memory: MateriItem;
  onClose: () => void;
  onOpenDetail?: (mem: MateriItem) => void;
}

function SmartAdaptiveCard({ memory, onClose, onOpenDetail }: SmartAdaptiveCardProps) {
  const map = useMap();
  const [pos, setPos] = useState<{
    x: number;
    y: number;
    placement: 'top' | 'bottom' | 'right' | 'left';
    width: number;
  } | null>(null);

  const calculatePosition = useCallback(() => {
    const lat = memory.location?.lat ?? SIDOARJO_CENTER[0];
    const lng = memory.location?.lng ?? SIDOARJO_CENTER[1];
    const pt = map.latLngToContainerPoint([lat, lng]);
    const size = map.getSize();

    // Dimensi kotak responsif
    const cardW = Math.min(310, size.x - 24);
    const cardH = 345;
    const pad = 12; // Margin pengaman dari tepi peta
    const gap = 16; // Jarak dari titik marker

    const spaceTop = pt.y - pad;
    const spaceBottom = size.y - pt.y - pad;
    const spaceRight = size.x - pt.x - pad;
    const spaceLeft = pt.x - pad;

    // Logika pemilihan penempatan adaptif sesuai instruksi:
    // 1. Coba Atas
    // 2. Jika Atas kepotong -> Coba Bawah
    // 3. Jika Bawah kepotong -> Coba Kanan
    // 4. Jika Kanan kepotong -> Coba Kiri
    let placement: 'top' | 'bottom' | 'right' | 'left' = 'top';

    if (spaceTop >= cardH + gap) {
      placement = 'top';
    } else if (spaceBottom >= cardH + gap) {
      placement = 'bottom';
    } else if (spaceRight >= cardW + gap) {
      placement = 'right';
    } else if (spaceLeft >= cardW + gap) {
      placement = 'left';
    } else {
      // Fallback untuk layar sangat terbatas: pilih sisi vertikal terluas
      placement = spaceBottom > spaceTop ? 'bottom' : 'top';
    }

    let targetTop = 0;
    let targetLeft = 0;

    if (placement === 'top') {
      targetTop = pt.y - cardH - gap;
      targetLeft = pt.x - cardW / 2;
    } else if (placement === 'bottom') {
      targetTop = pt.y + gap;
      targetLeft = pt.x - cardW / 2;
    } else if (placement === 'right') {
      targetTop = pt.y - cardH / 2;
      targetLeft = pt.x + gap;
    } else {
      // 'left'
      targetTop = pt.y - cardH / 2;
      targetLeft = pt.x - cardW - gap;
    }

    // Clamping ketat: menjamin kotak 100% tidak pernah kepotong di sisi mana pun
    const clampedLeft = Math.max(pad, Math.min(targetLeft, size.x - cardW - pad));
    const clampedTop = Math.max(pad, Math.min(targetTop, size.y - cardH - pad));

    setPos({
      x: clampedLeft,
      y: clampedTop,
      placement,
      width: cardW,
    });
  }, [map, memory]);

  useEffect(() => {
    calculatePosition();

    map.on('move', calculatePosition);
    map.on('zoom', calculatePosition);
    map.on('resize', calculatePosition);

    return () => {
      map.off('move', calculatePosition);
      map.off('zoom', calculatePosition);
      map.off('resize', calculatePosition);
    };
  }, [map, calculatePosition]);

  if (!pos) return null;

  return (
    <div
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${pos.width}px`,
        zIndex: 1000,
      }}
      className="absolute bg-paper border border-line rounded-md shadow-xl overflow-hidden transition-all duration-150 animate-in fade-in zoom-in-95 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Tombol Tutup Kotak */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-paper/90 hover:bg-paper text-ink/80 hover:text-ink shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 z-20 border border-line/60"
        aria-label="Tutup kotak cuplikan"
      >
        <span className="text-base leading-none font-bold">&times;</span>
      </button>

      {/* Foto Dokumentasi Responsif */}
      {memory.imageUrl && (
        <div className="relative w-full h-32 sm:h-36 bg-[#EFE9DF] overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-paper text-[10px]">
            <span className="bg-clay/90 px-1.5 py-0.5 rounded-xs font-bold uppercase tracking-wider">
              Kec. {memory.kecamatan}
            </span>
            <span className="bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded text-paper/90 font-medium">
              {memory.category}
            </span>
          </div>
        </div>
      )}

      {/* Konten Cuplikan Materi */}
      <div className="p-3.5 space-y-2 max-h-[220px] overflow-y-auto">
        <h4 className="font-serif font-bold text-ink text-sm sm:text-base leading-snug">
          {memory.title}
        </h4>

        {/* Info Lokasi & Koordinat */}
        <div className="space-y-1 text-[11px] text-ink/70">
          <div className="flex items-center gap-1.5 text-clay font-medium">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{memory.location?.name || `Kecamatan ${memory.kecamatan}`}</span>
          </div>

          {memory.koordinatText && (
            <div className="font-mono text-[10px] text-ink/60 line-clamp-1">
              📍 {memory.koordinatText}
            </div>
          )}
        </div>

        {/* Cuplikan Teks Materi */}
        <p className="text-xs text-ink/80 line-clamp-3 leading-relaxed bg-[#F9F6F0] p-2 rounded border border-line/60">
          {memory.content}
        </p>

        {/* Tombol Lihat Materi Lengkap: Barulah masuk ke materi utama saat ditekan */}
        <button
          type="button"
          onClick={() => {
            if (onOpenDetail) onOpenDetail(memory);
          }}
          className="w-full mt-2 py-2 px-3 bg-clay text-paper hover:bg-[#9E4520] transition-colors rounded-sm text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
        >
          <span>Lihat Materi Lengkap</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export interface MemoryMapProps {
  memories?: MateriItem[];
  selectedMemory?: MateriItem | null;
  flyTarget?: FlyTarget | null;
  onSelectMemory?: (mem: MateriItem) => void;
  onOpenDetail?: (mem: MateriItem) => void;
}

export const MemoryMap: React.FC<MemoryMapProps> = ({
  memories = [],
  selectedMemory = null,
  flyTarget = null,
  onSelectMemory,
  onOpenDetail,
}) => {
  const [activeMemory, setActiveMemory] = useState<MateriItem | null>(selectedMemory);

  // Sinkronkan state jika selectedMemory diubah dari komponen luar (misal dari daftar list)
  useEffect(() => {
    setActiveMemory(selectedMemory);
  }, [selectedMemory]);

  const handleMarkerClick = (mem: MateriItem) => {
    // Saat titik ditekan: HANYA munculkan kotak informasi di atas titik, JANGAN langsung masuk ke materi
    setActiveMemory(mem);
    if (onSelectMemory) onSelectMemory(mem);
  };

  const handleCloseCard = () => {
    setActiveMemory(null);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] md:h-[620px] rounded-md overflow-hidden border border-line shadow-xs bg-[#EFE9DF]">
      <MapContainer
        center={SIDOARJO_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={SIDOARJO_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        attributionControl={false}
        style={{ width: '100%', height: '100%', minHeight: '440px' }}
      >
        <MapResizeHandler />

        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapFlyController target={flyTarget} />

        {/* Titik-Titik Marker Kebudayaan Sidoarjo */}
        {memories.map((mem) => {
          const isSelected = activeMemory?.id === mem.id;
          const icon = createMarkerIcon(isSelected);
          const lat = mem.location?.lat ?? SIDOARJO_CENTER[0];
          const lng = mem.location?.lng ?? SIDOARJO_CENTER[1];

          return (
            <Marker
              key={mem.id}
              position={[lat, lng]}
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(mem),
              }}
            />
          );
        })}

        {/* Kotak Adaptif Cerdas yang Melayang di Dekat Titik Marker */}
        {activeMemory && (
          <SmartAdaptiveCard
            memory={activeMemory}
            onClose={handleCloseCard}
            onOpenDetail={onOpenDetail}
          />
        )}
      </MapContainer>

      {/* Indikator Wilayah Terkunci Sidoarjo */}
      <div className="absolute top-3 right-3 z-[1000] bg-paper/95 backdrop-blur-xs border border-line px-2.5 py-1 rounded text-[11px] text-ink/80 pointer-events-none flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse"></span>
        <span className="font-medium">Wilayah Terkunci: Kab. Sidoarjo ({memories.length} Titik)</span>
      </div>
    </div>
  );
};
