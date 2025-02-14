"use client";
import { useRef, useEffect } from 'react';

export default function HorizontalScroll({children}: {children: React.ReactNode}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        
        const handleWheel = (e: WheelEvent) => {
            if (!scrollContainer) return;
            
            const canScrollLeft = scrollContainer.scrollLeft > 0;
            const canScrollRight = scrollContainer.scrollLeft <
                scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            
            if ((delta > 0 && canScrollRight) || (delta < 0 && canScrollLeft)) {
                e.preventDefault();
                scrollContainer.scrollLeft += delta;
            }
        };
        
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
            
            return () => {
                scrollContainer.removeEventListener('wheel', handleWheel);
            };
        }
    }, []);
    
    return (
        <div className="relative">
            {/* Left blur gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            
            {/* Right blur gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            
            {/* Scroll container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-custom relative"
            >
                {children}
            </div>
        </div>
    );
}