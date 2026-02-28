"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketContent() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const busId = searchParams.get("busId") || "";
  const fare = searchParams.get("fare") || "";
  const code = searchParams.get("code") || "";
  const ref = searchParams.get("ref") || "";
  const boarding = searchParams.get("boarding") || "";
const destination = searchParams.get("destination") || "";
const date = searchParams.get("date") || "";
const time = searchParams.get("time") || "";
const tickets = searchParams.get("tickets") || "";
const type = searchParams.get("type") || ""; 
const qrValue = `Ref:${ref}|Code:${code}|From:${boarding}|To:${destination}|Date:${date}|Time:${time}`;

  // Get current system date and time
  const now = new Date();
  const currentDate = now.toLocaleDateString();
  const currentTime = now.toLocaleTimeString();

  return (
   
       

       
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-6">

  <div className="bg-white shadow-2xl rounded-3xl w-[550px] overflow-hidden">

    {/* HEADER */}
    <div className="bg-blue-900 text-white text-center py-5">
      <h1 className="text-3xl font-bold tracking-wide">
        🚌 RURBAN HITCH
      </h1>
      <p className="text-sm mt-1">Digital Bus Travel Ticket</p>
    </div>

    {/* BODY */}
    <div className="p-8 space-y-4 text-gray-800">

      <div className="flex justify-between">
        <p><strong>Ticket Ref:</strong> {ref}</p>
        <p><strong>Bus Type:</strong> {type}</p>
      </div>

      <hr className="border-dashed" />

      <div>
        <p><strong>From:</strong> {boarding}</p>
        <p><strong>To:</strong> {destination}</p>
      </div>

      <hr className="border-dashed" />

      <div className="grid grid-cols-2 gap-4">
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Tickets:</strong> {tickets}</p>
        <p><strong>Fare:</strong> ₹{fare}</p>
      </div>

      <hr className="border-dashed" />

      <div className="flex justify-between items-center">
        <p><strong>Ticket Code:</strong> {code}</p>
        <p className="text-green-600 font-semibold">Valid</p>
      </div>

      {/* QR CODE */}
      <div className="flex justify-center mt-6">
        <QRCodeCanvas
          value={qrValue}
          size={150}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      <div className="text-xs text-gray-500 text-center mt-4">
        This ticket is valid only for the selected route and date.
        Please show this QR code during ticket verification.
      </div>

    </div>

    {/* FOOTER */}
    <div className="bg-gray-100 text-center py-3 text-sm text-gray-600">
      Happy Journey 🎉 | Powered by RURBAN HITCH
    </div>
    <button
          onClick={() => router.push("/home")}
          className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition"
        >
          Back to Home
        </button>

  </div>
</div>

    
  );
}