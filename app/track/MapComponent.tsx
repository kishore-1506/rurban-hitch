"use client";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

interface Props {
  position: LatLngExpression;
}

export default function MapComponent({ position }: Props) {
  // Example Chennai Route
  const route: LatLngExpression[] = [
    [13.0827, 80.2707],
    [13.0850, 80.2750],
    [13.0900, 80.2800],
    [13.0950, 80.2850],
    [13.1000, 80.2900],
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  let i = 0;

  const interval = setInterval(() => {
    i++;
    if (i < route.length) {
      setCurrentIndex(i);
    } else {
      clearInterval(interval);
    }
  }, 1500);

  return () => clearInterval(interval);
}, []);
   
  const busIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
  iconSize: [40, 40],
  iconAnchor:[20,40],
});
  return (
    <MapContainer
      center={route[0]}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Route Line */}
      <Polyline positions={route} color="blue" />

      {/* Boarding Marker */}
      <Marker position={route[0]} />

      {/* Destination Marker */}
      <Marker position={route[route.length - 1]} />

      {/* Moving Bus Marker */}
      <Marker position={route[currentIndex]} icon={busIcon} />
    </MapContainer>
  );
}