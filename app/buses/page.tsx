"use client";

import { Suspense } from "react";
import BusesContent from "./BusesContent";

export default function BusesPage() {
  return (
    <Suspense fallback={<div>Loading buses...</div>}>
      <BusesContent />
    </Suspense>
  );
}