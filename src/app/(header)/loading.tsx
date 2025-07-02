import { Loader } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
    <Loader className="animate-spin size-6 text-blue-500"/>
  </div>
}