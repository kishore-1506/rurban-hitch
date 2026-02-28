"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function BusesContent() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const boarding = searchParams.get("boarding");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const tickets = searchParams.get("tickets");

  // Temporary mock data
  const mockBuses = [
    {
      id: 1,
      route: "TN-01 Express",
      type: "Express",
      fare: 120,
      arrival: "10:30 AM",
    },
    {
      id: 2,
      route: "TN-02 Deluxe",
      type: "Deluxe",
      fare: 180,
      arrival: "11:15 AM",
    },
    {
      id: 3,
      route: "TN-03 AC",
      type: "AC",
      fare: 250,
      arrival: "12:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-blue-900 mb-4">
        Available Buses
      </h1>

      <p className="mb-8 text-gray-600">
        {boarding} → {destination} | {date} | {time} | {tickets} Tickets
      </p>

      <div className="space-y-6">

        {mockBuses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                {bus.route}
              </h2>
              <p className="text-gray-600">
                Type: {bus.type}
              </p>
              <p className="text-gray-600">
                Arrival: {bus.arrival}
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-orange-500">
                ₹{bus.fare}
              </p>

              <button
  onClick={() =>
    router.push(`/booking?busId=${bus.id}&fare=${bus.fare}&boarding=${boarding}&destination=${destination}&date=${date}&time=${time}&tickets=${tickets}&type=${bus.type}`)
  }
  className="mt-3 bg-blue-900 text-white px-4 py-2 rounded"
>
  Book Ticket
</button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}