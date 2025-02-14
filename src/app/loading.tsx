import React from 'react';
import { CircleDot, Binary } from 'lucide-react';

export default function Loading() {
    return (
        <div className="w-full h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse" />
            
            {/* Main loading container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Loading circles */}
                <div className="relative">
                    {/* Outer circle */}
                    <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 animate-spin" />
                    
                    {/* Inner circle */}
                    <div className="absolute top-4 left-4 w-24 h-24 rounded-full border-4 border-purple-500/30 animate-spin" />
                    
                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
                </div>
                
                {/* Text section */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
                        Loading AI
                    </h2>
                    
                    {/* Animated dots */}
                    <div className="flex justify-center space-x-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" />
                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce delay-150" />
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-300" />
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            {i % 2 === 0 ? (
                                <CircleDot className="text-blue-400/20" size={16} />
                            ) : (
                                <Binary className="text-purple-400/20" size={16} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1s_infinite]" />
            </div>
        </div>
    );
}