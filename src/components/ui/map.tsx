"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

// Types
interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: "project" | "supplier" | "import" | "office";
  status?: string;
}

interface VesatioMapProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
  height?: string;
  showControls?: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Vesatio Dark Map Style
const VESATIO_MAP_STYLE = "mapbox://styles/mapbox/dark-v11";

export function VesatioMap({
  markers = [],
  center = [-23.5, 15.1], // Default to Cabo Verde
  zoom = 10,
  onMarkerClick,
  height = "400px",
  showControls = true,
}: VesatioMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!MAPBOX_TOKEN) {
      setError("Mapbox token não configurado");
      return;
    }

    // Dynamic import of mapbox-gl
    import("mapbox-gl")
      .then((mapboxModule) => {
        const mapboxgl = mapboxModule.default || mapboxModule;
        mapboxgl.accessToken = MAPBOX_TOKEN as string;

        const map = new mapboxgl.Map({
          container: mapContainer.current!,
          style: VESATIO_MAP_STYLE,
          center: center,
          zoom: zoom,
        });

        mapRef.current = map;

        map.on("load", () => {
          setMapLoaded(true);

          // Add markers
          markers.forEach((marker) => {
            const el = document.createElement("div");
            el.className = "vesatio-marker";
            el.style.cssText = `
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid #b8860b;
                        background: ${getMarkerColor(marker.type)};
                    `;

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                        <div style="padding: 8px; color: #0a0a0a;">
                            <strong>${marker.title}</strong>
                            ${marker.status ? `<br/><span style="font-size: 12px;">${marker.status}</span>` : ""}
                        </div>
                    `);

            new mapboxgl.Marker(el).setLngLat([marker.lng, marker.lat]).setPopup(popup).addTo(map);

            el.addEventListener("click", () => {
              onMarkerClick?.(marker);
            });
          });

          // Add controls
          if (showControls) {
            map.addControl(new mapboxgl.NavigationControl(), "top-right");
          }
        });

        return () => map.remove();
      })
      .catch((err) => {
        console.error("Failed to load Mapbox:", err);
        setError("Falha ao carregar mapa");
      });
  }, [center, zoom, markers, onMarkerClick, showControls]);

  const getMarkerColor = (type: MapMarker["type"]): string => {
    switch (type) {
      case "project":
        return "#b8860b";
      case "supplier":
        return "#4CAF50";
      case "import":
        return "#2196F3";
      case "office":
        return "#9C27B0";
      default:
        return "#888";
    }
  };

  if (error) {
    return (
      <Card
        className="flex items-center justify-center border-white/10 bg-onyx-800"
        style={{ height }}
      >
        <p className="text-sm text-diamond-muted">{error}</p>
      </Card>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="overflow-hidden rounded-xl"
      style={{ height, width: "100%" }}
    />
  );
}

// Address Autocomplete Component
interface AddressAutocompleteProps {
  onSelect: (address: { label: string; lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
}

export function AddressAutocomplete({
  onSelect,
  placeholder = "Pesquisar endereço...",
  className = "",
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ id: string; place_name: string; center: [number, number] }>
  >([]);
  const [, setIsLoading] = useState(false);

  const searchAddress = async (q: string) => {
    if (!q || q.length < 3 || !MAPBOX_TOKEN) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${MAPBOX_TOKEN}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => searchAddress(query), 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (feature: { place_name: string; center: [number, number] }) => {
    onSelect({
      label: feature.place_name,
      lng: feature.center[0],
      lat: feature.center[1],
    });
    setQuery(feature.place_name);
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-diamond placeholder:text-diamond-muted focus:border-gold/50 focus:outline-none"
      />
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-white/10 bg-onyx-900">
          {suggestions.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleSelect(feature)}
              className="w-full px-4 py-2 text-left text-sm text-diamond transition-colors hover:bg-white/5"
            >
              {feature.place_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Mini Map Preview (for cards)
export function MiniMapPreview({ lat, lng, title }: { lat: number; lng: number; title: string }) {
  return (
    <VesatioMap
      markers={[{ id: "1", lat, lng, title, type: "project" }]}
      center={[lng, lat]}
      zoom={14}
      height="150px"
      showControls={false}
    />
  );
}
