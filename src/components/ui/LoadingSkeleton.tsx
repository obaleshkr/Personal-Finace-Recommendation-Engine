import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className = '', count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`rounded-xl bg-white/5 animate-shimmer ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LoadingSkeleton className="h-32" count={4} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <LoadingSkeleton className="h-80 col-span-2" />
        <LoadingSkeleton className="h-80" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LoadingSkeleton className="h-60" />
        <LoadingSkeleton className="h-60" />
      </div>
    </div>
  );
}
