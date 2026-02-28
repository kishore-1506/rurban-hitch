"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function BookingContent() {

  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
  const user = auth.currentUser;

  if (!user) {
    router.push("/login");
  }
}, [router]);
  const busId = searchParams.get("busId");
  const fare = searchParams.get("fare");
  const boarding = searchParams.get("boarding");
const destination = searchParams.get("destination");
const date = searchParams.get("date");
const time = searchParams.get("time");
const tickets = searchParams.get("tickets");
const type = searchParams.get("type");

  const handlePayment = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login again");
      return;
    }

    const ticketCode = Math.floor(1000 + Math.random() * 9000);
    const ticketRef = "RH" + Math.floor(100000 + Math.random() * 900000);

    // Save booking in Firestore
   await addDoc(collection(db, "bookings"), {
  userId: user.uid,
  busId: busId,
  busType: type,
  boarding: boarding,
  destination: destination,
  travelDate: date,
  travelTime: time,
  tickets: tickets,
  fare: fare,
  ticketCode: ticketCode,
  ticketRef: ticketRef,
  createdAt: new Date(),
});

    router.push(`/ticket?busId=${busId}&fare=${fare}&code=${ticketCode}&ref=${ticketRef}&boarding=${boarding}&destination=${destination}&date=${date}&time=${time}&tickets=${tickets}&type=${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Booking & Payment
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Journey Summary
        </h2>

        <p>Bus ID: {busId}</p>
        <p>Fare: ₹{fare}</p>

        <hr />

        <h3 className="font-semibold text-gray-700">
          Select Payment Method
        </h3>

        <div className="space-y-3">
          <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
            UPI
          </button>

          <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
            Debit Card
          </button>

          <button className="w-full border p-3 rounded-lg hover:bg-gray-100">
            Credit Card
          </button>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Pay Now
        </button>

      </div>

    </div>
  );
}