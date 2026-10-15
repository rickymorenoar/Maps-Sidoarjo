import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SIDOARJO_CENTER, DEFAULT_ZOOM, FOCUS_ZOOM } from '../../lib/constants';

/**
 * Buat custom divIcon Leaflet dengan denyut CSS
 */
function createMarkerIcon(isActive = false) {
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

/**
 * Komponen pembantu untuk memicu map.flyTo secara halus saat ada target baru
 */
function MapFlyController({ target }) {
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
 * Peta interaktif Sidoarjo Memory Map menggunakan Leaflet & React-Leaflet
 */
export function MemoryMap({
  memories = [],
  selectedMemory = null,
  flyTarget = null,
  onSelectMemory,
}) {
  const markerRefs = useRef({});

  // Buka popup ketika titik memori dipilih dari daftar atau form baru
  useEffect(() => {
    if (selectedMemory && markerRefs.current[selectedMemory.id]) {
      markerRefs.current[selectedMemory.id].openPopup();
    }
  }, [selectedMemory]);

  return (
    <div className="relative w-full h-full min-h-[420px] md:min-h-[560px] rounded-md overflow-hidden border border-line shadow-xs">
      <MapContainer
        center={SIDOARJO_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        <MapFlyController target={flyTarget} />

        {memories.map((mem) => {
          const isSelected = selectedMemory?.id === mem.id;
          const icon = createMarkerIcon(isSelected);

          return (
            <Marker
              key={mem.id}
              position={[mem.location.lat, mem.location.lng]}
              icon={icon}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current[mem.id] = ref;
                } else {
                  delete markerRefs.current[mem.id];
                }
              }}
              eventHandlers={{
                click: () => {
                  if (onSelectMemory) onSelectMemory(mem);
                },
              }}
            >
              <Popup>
                <div className="p-1">
                  <span className="inline-block px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase bg-tambak/10 text-tambak rounded-sm mb-1.5 border border-tambak/20">
                    {mem.category}
                  </span>
                  <h4 className="font-serif font-bold text-ink text-base leading-tight mb-1">
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
                    <span>{mem.location.name}</span>
                  </div>
                  <p className="text-xs text-ink/85 line-clamp-3 leading-relaxed mb-2 italic">
                    "{mem.story}"
                  </p>
                  <div className="text-[10px] text-ink/50 border-t border-line/60 pt-1.5 flex justify-between">
                    <span>
                      {new Date(mem.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-clay font-medium">Ingatan Warga</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Kompas / Petunjuk estetika peta di pojok kanan atas */}
      <div className="absolute top-3 right-3 z-[1000] bg-paper/90 backdrop-blur-xs border border-line px-2.5 py-1 rounded text-[11px] text-ink/80 pointer-events-none flex items-center gap-1.5 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse"></span>
        <span>{memories.length} Titik Terpeta</span>
      </div>
    </div>
  );
}
