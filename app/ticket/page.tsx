"use client";

import { Suspense } from "react";
import TicketContent from "./TicketContent";

export default function TicketPage() {
  return (
    <Suspense fallback={<div>Loading ticket...</div>}>
      <TicketContent />
    </Suspense>
  );
}