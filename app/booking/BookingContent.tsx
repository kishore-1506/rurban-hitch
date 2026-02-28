"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect , useState } from "react";
import { auth, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";


export default function BookingContent() {
  
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
const [processing, setProcessing] = useState(false);
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

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6 bg-white text-gray-900 placeholder-gray-500">

        <h2 className="text-xl font-semibold text-gray-800 ">
          Journey Summary
        </h2>

        <p>Bus ID: {busId}</p>
        <p>Fare: ₹{fare}</p>

        <hr />

        <h3 className="font-semibold text-gray-700">
          Select Payment Method
        </h3>

       <div className="space-y-3 bg-white text-gray-900 placeholder-gray-500" >

  {["UPI", "Debit Card", "Credit Card"].map((method) => (
    <button
      key={method}
      type="button"
      onClick={() => setSelectedMethod(method)}
      className={`w-full border p-3 rounded-lg transition  ${
        selectedMethod === method
          ? "bg-green-100 border-green-500 "
          : "hover:bg-gray-100"
      }`}
    >
      {method}
    </button>
  ))}

</div>

        <button
  onClick={async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    setProcessing(true);

    setTimeout(async () => {
      await handlePayment();
    }, 2000);
  }}
  disabled={processing}
  className={`w-full p-3 rounded-lg transition text-white  ${
    processing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
  }`}
>
  {processing ? "Processing Payment..." : "Pay Now"}
</button>

      </div>

    </div>
  );
}