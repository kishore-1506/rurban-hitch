"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function BookingHistoryPage() {

  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {

    const fetchBookings = async () => {

      const user = auth.currentUser;

      if (!user) {
        router.push("/login");
        return;
      }

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      const userBookings: any[] = [];

      querySnapshot.forEach((doc) => {
        userBookings.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setBookings(userBookings);
    };

    fetchBookings();

  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        My Booking History
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-2xl shadow-md bg-white text-gray-900 placeholder-gray-500"
            >
              <p><strong>Ticket Ref:</strong> {booking.ticketRef}</p>
              <p><strong>Bus ID:</strong> {booking.busId}</p>
              <p><strong>Fare:</strong> ₹{booking.fare}</p>
              <p><strong>Ticket Code:</strong> {booking.ticketCode}</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}