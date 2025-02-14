'use client';
import Image from 'next/image';
import left from '@/public/left.png';
import bottom from '@/public/bottom.png';
import top from '@/public/top.png';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Search } from 'lucide-react';
import right from '@/public/right.png';
import useMediaQuery from '@/hooks/use-media-query';
import HeroSearch from '@/HeroSearch';

export function Hero(){
    const isMobile = useMediaQuery('(max-width: 780px)');
    return(
        
        <div className="px-10">
            {!isMobile && <section className="h-[25rem] bg-hero-gradient rounded-2xl flex max-w-custom mx-auto">
                
                <Image className="w-fit pl-8" src={left} alt="AI character images"/>
                
                <div className="flex flex-col justify-center h-full w-full max-w-2xl mx-auto px-4 z-10">
                    <h1 className="text-center text-4xl mb-4 drop-shadow-2xl">Scale your professional workforce
                        with <span className="font-bold">Ai Agents</span></h1>
                    <div className="flex bg-muted rounded-xl py-1">
                        <HeroSearch/>
                    </div>
                </div>
                <Image className="w-fit pr-2" src={right} alt="AI character images"/>
            
            </section>}
            
            {isMobile && <section className="h-auto bg-hero-gradient rounded-2xl flex w-[calc(100vw-5px)] flex-col place-self-center place-items-center p-2 gap-5">
                <Image className="w-fit" src={top} alt="AI character images"/>
                <div className="flex flex-col justify-center h-full w-full max-w-2xl mx-auto px-4 z-10">
                    <h1 className="text-center text-xl mb-4 drop-shadow-2xl">Scale your professional workforce
                        with <span className="font-bold">Ai Agents</span></h1>
                    <div className="flex bg-muted rounded-xl py-1">
                        <HeroSearch/>
                    </div>
                </div>
                <Image className="w-fit" src={bottom} alt="AI character images"/>
            </section>
            
            }
        
    </div>
    )
}