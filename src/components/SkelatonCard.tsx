import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  lines?: number; // number of text lines to show
  avatar?: boolean; // show avatar circle
  actions?: boolean; // show action buttons
  className?: string;
}

export function SkeletonCard({
  lines = 3,
  avatar = false,
  actions = false,
  className = "",
}: SkeletonCardProps) {
  return (
    <div className="my-6">
      <div
        className={`bg-white dark:bg-gray-900  rounded-xl shadow w-[90vw]  md:w-[40vw]  lg:w-[25vw] flex p-10 flex-col gap-8 ${className}`}
      >
        {avatar && (
          <div className="flex justify-center mb-2">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          {[...Array(lines)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 ${i === 0 ? "w-2/3" : "w-full"} ${
                i === lines - 1 ? "w-1/2" : ""
              }`}
            />
          ))}
        </div>
        {actions && (
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SkeletonCard;
