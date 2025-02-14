"use client";
import { useRef, useEffect } from 'react';

export default function HorizontalScroll({children}: {children: React.ReactNode}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;
        
        // Mouse wheel handling
        const handleWheel = (e: WheelEvent) => {
            const canScrollLeft = scrollContainer.scrollLeft > 0;
            const canScrollRight = scrollContainer.scrollLeft <
                scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            
            if ((delta > 0 && canScrollRight) || (delta < 0 && canScrollLeft)) {
                e.preventDefault();
                scrollContainer.scrollLeft += delta;
            }
        };
        
        // Touch handling
        const handleTouchStart = (e: TouchEvent) => {
            isDragging.current = true;
            startX.current = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeft.current = scrollContainer.scrollLeft;
        };
        
        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - startX.current) * 2; // Scroll-fast factor
            scrollContainer.scrollLeft = scrollLeft.current - walk;
        };
        
        const handleTouchEnd = () => {
            isDragging.current = false;
        };
        
        // Mouse drag handling (optional, but provides consistent experience)
        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            startX.current = e.pageX - scrollContainer.offsetLeft;
            scrollLeft.current = scrollContainer.scrollLeft;
        };
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX.current) * 2;
            scrollContainer.scrollLeft = scrollLeft.current - walk;
        };
        
        const handleMouseUp = () => {
            isDragging.current = false;
        };
        
        // Add event listeners
        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
        scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        scrollContainer.addEventListener('touchend', handleTouchEnd);
        scrollContainer.addEventListener('mousedown', handleMouseDown);
        scrollContainer.addEventListener('mousemove', handleMouseMove);
        scrollContainer.addEventListener('mouseup', handleMouseUp);
        scrollContainer.addEventListener('mouseleave', handleMouseUp);
        
        // Cleanup
        return () => {
            scrollContainer.removeEventListener('wheel', handleWheel);
            scrollContainer.removeEventListener('touchstart', handleTouchStart);
            scrollContainer.removeEventListener('touchmove', handleTouchMove);
            scrollContainer.removeEventListener('touchend', handleTouchEnd);
            scrollContainer.removeEventListener('mousedown', handleMouseDown);
            scrollContainer.removeEventListener('mousemove', handleMouseMove);
            scrollContainer.removeEventListener('mouseup', handleMouseUp);
            scrollContainer.removeEventListener('mouseleave', handleMouseUp);
        };
    }, []);
    
    return (
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-custom relative touch-pan-x"
            >
                {children}
            </div>
        </div>
    );
}