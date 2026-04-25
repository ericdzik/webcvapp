"use client";
import { Suspense } from "react";
import CreatePageInner from "./CreatePageInner";

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-400">Chargement...</div>}>
      <CreatePageInner />
    </Suspense>
  );
}
