import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-9 w-52" />
      </div>

      <div className="rounded-md border">
        <div className="flex items-center gap-4 px-4 py-3 border-b">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-4 w-28 hidden md:block" />
          <Skeleton className="h-4 w-24 hidden lg:block" />
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3.5 border-b last:border-0"
          >
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-28 hidden md:block" />
            <Skeleton className="h-4 w-36 hidden md:block" />
            <Skeleton className="h-4 w-28 hidden md:block" />
            <Skeleton className="h-4 w-20 hidden lg:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
