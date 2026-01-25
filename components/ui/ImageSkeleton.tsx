// components/ui/ImageSkeleton.tsx
'use client';

import { cn } from '@/lib/utils';

interface ImageSkeletonProps {
    className?: string;
    variant?: 'rectangular' | 'square' | 'circular';
    aspectRatio?: string;
}

export default function ImageSkeleton({
    className,
    variant = 'rectangular',
    aspectRatio = 'aspect-video',
}: ImageSkeletonProps) {
    const variantClasses = {
        rectangular: aspectRatio,
        square: 'aspect-square',
        circular: 'aspect-square rounded-full',
    };

    return (
        <div
            className={cn(
                'w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg',
                variantClasses[variant],
                className
            )}
            aria-label="Loading..."
            role="status"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}
