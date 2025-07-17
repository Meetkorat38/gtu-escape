// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-24 sm:py-32">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Frown className="h-12 w-12 text-gray-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="default">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
