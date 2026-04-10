import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen p-6 md:p-10 max-w-3xl mx-auto">
      <Skeleton className="h-4 w-36 mb-8" />

      <div className="mb-6">
        <Skeleton className="h-8 w-56 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>

      <Skeleton className="h-11 w-full rounded-lg mb-6" />

      <div className="rounded-lg border divide-y">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-6 px-5 py-4">
            <Skeleton className="h-4 w-32 shrink-0" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
