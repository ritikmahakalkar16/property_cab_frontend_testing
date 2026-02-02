"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import circle from "@turf/circle";
import "maplibre-gl/dist/maplibre-gl.css";

interface NearbyPlace {
  name: string;
  category: string;
  distance: string;
}

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  nearbyPlaces?: NearbyPlace[];
  className?: string;

  plotPolygon?: [number, number][];
  propertiesGeoJson?: GeoJSON.FeatureCollection;
  onPickLocation?: (lng: number, lat: number) => void;
}

const LIGHT_STYLE =
  "https://api.maptiler.com/maps/streets/style.json?key=HKGyZVromMUFx9ujDCMR";
const DARK_STYLE =
  "https://api.maptiler.com/maps/darkmatter/style.json?key=HKGyZVromMUFx9ujDCMR";
const SATELLITE_STYLE =
  "https://api.maptiler.com/maps/hybrid/style.json?key=HKGyZVromMUFx9ujDCMR";

const PropertyMap = ({
  latitude,
  longitude,
  title,
  nearbyPlaces,
  plotPolygon,
  propertiesGeoJson,
  onPickLocation,
  className = "",
}: PropertyMapProps) => {

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const add3DBuildings = (map: maplibregl.Map) => {
      const style = map.getStyle();
      if (!style.sources || !style.sources["openmaptiles"]) return;

      const layers = style.layers || [];
      const labelLayerId = layers.find(
        (l) => l.type === "symbol" && (l.layout as any)?.["text-field"]
      )?.id;

      if (!map.getLayer("3d-buildings")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      }
    };

    const addDistanceRings = (map: maplibregl.Map) => {
      if (map.getSource("rings")) return;

      const rings = [0.5, 1, 2].map((km) =>
        circle([longitude, latitude], km, { steps: 64, units: "kilometers" })
      );

      map.addSource("rings", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: rings,
        },
      });

      map.addLayer({
        id: "rings",
        type: "line",
        source: "rings",
        paint: {
          "line-color": "#3b82f6",
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      });
    };

    const addPlot = (map: maplibregl.Map) => {
      if (!plotPolygon || plotPolygon.length < 3) return;
      if (map.getSource("plot")) return;

      map.addSource("plot", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [[...plotPolygon, plotPolygon[0]]],
          },
        },
      });

      map.addLayer({
        id: "plot-fill",
        type: "fill",
        source: "plot",
        paint: {
          "fill-color": "#22c55e",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "plot-outline",
        type: "line",
        source: "plot",
        paint: {
          "line-color": "#16a34a",
          "line-width": 2,
        },
      });
    };

    const addHeatmap = (map: maplibregl.Map) => {
      if (!propertiesGeoJson) return;
      if (map.getSource("properties")) return;

      map.addSource("properties", {
        type: "geojson",
        data: propertiesGeoJson,
        cluster: true,
        clusterRadius: 50,
      });

      map.addLayer({
        id: "price-heat",
        type: "heatmap",
        source: "properties",
        maxzoom: 15,
        paint: {
          "heatmap-weight": ["coalesce", ["get", "price"], 1],
          "heatmap-intensity": 1.2,
          "heatmap-radius": 25,
        },
      });
    };

    if (!mapInstanceRef.current) {
      const map = new maplibregl.Map({
        container: mapRef.current,
        style: LIGHT_STYLE,
        center: [longitude, latitude],
        zoom: 15,
        pitch: 45,
        bearing: -20,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("load", () => {
        add3DBuildings(map);
        addDistanceRings(map);
        addPlot(map);
        addHeatmap(map);
      });

      map.on("style.load", () => {
        add3DBuildings(map);
        addDistanceRings(map);
        addPlot(map);
        addHeatmap(map);
      });

      if (onPickLocation) {
        map.on("click", (e) => {
          onPickLocation(e.lngLat.lng, e.lngLat.lat);
        });
      }

      mapInstanceRef.current = map;

      const mainMarker = new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<strong>${title}</strong><br/>Property Location`
          )
        )
        .addTo(map);

      markersRef.current.push(mainMarker);
    }

    const map = mapInstanceRef.current!;

    markersRef.current.slice(1).forEach((m) => m.remove());
    markersRef.current = markersRef.current.slice(0, 1);

    if (nearbyPlaces?.length) {
      const placeColors: Record<string, string> = {
        metro: "#3b82f6",
        bus: "#10b981",
        railway: "#8b5cf6",
        airport: "#f59e0b",
        hospital: "#ef4444",
        school: "#06b6d4",
        mall: "#ec4899",
        park: "#22c55e",
        restaurant: "#f97316",
        default: "#6b7280",
      };

      nearbyPlaces.forEach((place, index) => {
        const el = document.createElement("div");
        const color =
          placeColors[place.category?.toLowerCase()] || placeColors.default;

        el.innerHTML = `
          <div style="background:${color};width:24px;height:24px;border-radius:50%;
          border:2px solid white;display:flex;align-items:center;justify-content:center;
          color:white;font-size:10px;font-weight:600;">
            ${index + 1}
          </div>
        `;

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([
            longitude + (Math.random() - 0.5) * 0.01,
            latitude + (Math.random() - 0.5) * 0.01,
          ])
          .setPopup(
            new maplibregl.Popup({ offset: 20 }).setHTML(
              `<strong>${place.name}</strong><br/>${place.category} - ${place.distance}`
            )
          )
          .addTo(map);

        markersRef.current.push(marker);
      });

      const bounds = new maplibregl.LngLatBounds();
      markersRef.current.forEach((m) => bounds.extend(m.getLngLat()));
      map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
    }
  }, [
    latitude,
    longitude,
    title,
    nearbyPlaces,
    plotPolygon,
    propertiesGeoJson,
    onPickLocation,
  ]);

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className={`w-full h-[400px] rounded-xl overflow-hidden shadow-lg ${className}`}
      />

      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <button
          onClick={() => mapInstanceRef.current?.setStyle(LIGHT_STYLE)}
          className="bg-white px-2 py-1 rounded shadow text-xs"
        >
          Light
        </button>
        <button
          onClick={() => mapInstanceRef.current?.setStyle(DARK_STYLE)}
          className="bg-white px-2 py-1 rounded shadow text-xs"
        >
          Dark
        </button>
        <button
          onClick={() => mapInstanceRef.current?.setStyle(SATELLITE_STYLE)}
          className="bg-white px-2 py-1 rounded shadow text-xs"
        >
          Satellite
        </button>
        <button
          onClick={() =>
            mapInstanceRef.current?.flyTo({
              center: [longitude, latitude],
              zoom: 17,
              pitch: 45,
              bearing: -20,
            })
          }
          className="bg-white px-2 py-1 rounded shadow text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PropertyMap;
