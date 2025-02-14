"use client";
import { useRef, useEffect } from 'react';

export default function HorizontalScroll({children}: {children: React.ReactNode}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        
        const handleWheel = (e: WheelEvent) => {
            if (!scrollContainer) return;
            
            // Calculate if we can scroll more in the direction user is trying to scroll
            const canScrollLeft = scrollContainer.scrollLeft > 0;
            const canScrollRight = scrollContainer.scrollLeft <
                scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // Use deltaY for vertical wheel and deltaX for horizontal wheel/touchpad gestures
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            
            // Only prevent default scroll if:
            // 1. Scrolling right (positive delta) and we can scroll right
            // 2. Scrolling left (negative delta) and we can scroll left
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
        <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-full"
        >
            {children}
        </div>
    );
}