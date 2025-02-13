'use client';
import Image from 'next/image';
import left from '@/public/left.png';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Search } from 'lucide-react';
import right from '@/public/right.png';
import useMediaQuery from '@/hooks/use-media-query';

export function Hero(){
    // todo adjust breakpoint
    const isMobile = useMediaQuery('(max-width: 780px)');
    return(
        
        <div className="px-10">
            {!isMobile && <section className="h-[25rem] bg-hero-gradient rounded-2xl flex max-w-custom mx-auto">
                
                <Image className="w-fit pl-8" src={left} alt="AI character images"/>
                
                <div className="flex flex-col justify-center h-full w-full max-w-2xl mx-auto px-4 z-10">
                    <h1 className="text-center text-4xl mb-4 drop-shadow-2xl">Scale your professional workforce
                        with <span className="font-bold">Ai Agents</span></h1>
                    <div className="flex bg-muted rounded-xl py-1">
                        <Input
                            className="placeholder:text-foreground placeholder:font-light focus-visible:ring-0 border-0 my-1"
                            placeholder="Search for any agent service.."/>
                        <Button className="mr-3 h-full"><Search className="-mx-1"/></Button>
                    </div>
                </div>
                <Image className="w-fit pr-2" src={right} alt="AI character images"/>
            
            </section>}
            
            {isMobile && <section className="h-[25rem] bg-hero-gradient rounded-2xl flex max-w-custom mx-auto">
            
            </section>
            
            }
        
        {/*    todo add mobile handler*/}
    </div>
    )
}