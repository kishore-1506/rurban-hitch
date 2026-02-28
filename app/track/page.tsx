"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function TrackPage() {
  const router = useRouter();

  const [position, setPosition] = useState<[number, number]>([
    13.0827,
    80.2707,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(([lat, lng]) => [lat + 0.0005, lng + 0.0005]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        🛰️ Live Bus Tracking
      </h1>

      <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapComponent position={position} />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => router.push("/home")}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}