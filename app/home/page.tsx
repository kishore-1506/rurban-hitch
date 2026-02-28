"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const [boarding, setBoarding] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tickets, setTickets] = useState(1);

  const handleSearch = () => {
    router.push(
      `/buses?boarding=${boarding}&destination=${destination}&date=${date}&time=${time}&tickets=${tickets}`
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Search Your Bus
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">

          <div className="grid grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Boarding Point"
              className="p-3 border rounded-lg bg-white text-gray-900"
              value={boarding}
              onChange={(e) => setBoarding(e.target.value)}
            />

            <input
              type="text"
              placeholder="Destination"
              className="p-3 border rounded-lg bg-white text-gray-900"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <input
              type="date"
              className="p-3 border rounded-lg bg-white text-gray-900"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="p-3 border rounded-lg bg-white text-gray-900"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <input
              type="number"
              placeholder="No. of Tickets"
              className="p-3 border rounded-lg bg-white text-gray-900"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
            />
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
          >
            Search Buses
          </button>

        </div>
      </div>
    </div>
  );
}