import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
    popupAnchor: [0, -14],
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
  const markerRefs = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (selectedMemory && markerRefs.current[selectedMemory.id]) {
      markerRefs.current[selectedMemory.id].openPopup();
    }
  }, [selectedMemory]);

  const handleMarkerClick = (mem: MateriItem) => {
    if (onSelectMemory) onSelectMemory(mem);
    if (onOpenDetail) onOpenDetail(mem);
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
        style={{ width: '100%', height: '100%', minHeight: '440px' }}
      >
        <MapResizeHandler />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapFlyController target={flyTarget} />

        {memories.map((mem) => {
          const isSelected = selectedMemory?.id === mem.id;
          const icon = createMarkerIcon(isSelected);
          const lat = mem.location?.lat ?? SIDOARJO_CENTER[0];
          const lng = mem.location?.lng ?? SIDOARJO_CENTER[1];

          return (
            <Marker
              key={mem.id}
              position={[lat, lng]}
              icon={icon}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[mem.id] = ref;
                } else {
                  delete markerRefs.current[mem.id];
                }
              }}
              eventHandlers={{
                click: () => handleMarkerClick(mem),
              }}
            >
              <Popup>
                <div className="p-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-clay/10 text-clay rounded-sm border border-clay/20">
                      Kec. {mem.kecamatan || 'Sidoarjo'}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-tambak/10 text-tambak rounded-sm border border-tambak/20">
                      {mem.category}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-ink text-sm sm:text-base leading-snug mb-1">
                    {mem.title}
                  </h4>

                  <div className="flex items-center text-xs text-ink/70 mb-2 gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-clay shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">{mem.location?.name || `Kecamatan ${mem.kecamatan}`}</span>
                  </div>

                  <p className="text-xs text-ink/85 line-clamp-3 leading-relaxed mb-2 bg-[#F9F6F0] p-2 rounded border border-line/60">
                    {mem.content}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenDetail) onOpenDetail(mem);
                    }}
                    className="w-full mt-1.5 py-1.5 px-3 bg-clay text-paper hover:bg-[#9E4520] transition-colors rounded-sm text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Buka Halaman Materi Lengkap</span>
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Indikator Wilayah Terkunci Sidoarjo */}
      <div className="absolute top-3 right-3 z-[1000] bg-paper/95 backdrop-blur-xs border border-line px-2.5 py-1 rounded text-[11px] text-ink/80 pointer-events-none flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse"></span>
        <span className="font-medium">Wilayah Terkunci: Kab. Sidoarjo ({memories.length} Titik)</span>
      </div>
    </div>
  );
};
