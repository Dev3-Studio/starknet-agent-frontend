"use client";
import { useRef, useEffect } from 'react';

export default function HorizontalScroll({children}: {children: React.ReactNode}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            
            if (scrollContainer) {
                // Use deltaY for vertical wheel and deltaX for horizontal wheel/touchpad gestures
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
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