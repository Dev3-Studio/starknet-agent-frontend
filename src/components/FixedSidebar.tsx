'use client';

import Logo from '@/public/logo.svg';
import { useSidebar } from '@/ui/sidebar';
import { ArrowLeftToLine, ArrowRightToLine, Bookmark, Compass, Plus } from 'lucide-react';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

export default function FixedSidebar() {
    const { toggleSidebar, open }= useSidebar();
    return (
        <div className="h-full w-24 bg-muted text-white z-20 grid grid-rows-[auto,auto,1fr,auto]">

            <div className="flex flex-col items-center">
                <Logo className="p-4 w-full" />
                <Button variant="ghost" onClick={toggleSidebar}>
                    {!open && <ArrowRightToLine/>}
                    {open && <ArrowLeftToLine />}
                </Button>
            </div>
            
            <div className="flex flex-col items-center gap-4 px-3">
                <Separator className="w-full h-[2px] bg-accent"/>
                
                <Plus className="size-8 rounded-full bg-background border-foreground border"/>
                <Bookmark className="size-8 fill-foreground"/>
                
                <Separator className="w-full h-[2px] bg-accent"/>
            </div>
            
            <div>
                AI list
            </div>
            
            
            <div className="bg-background w-full flex justify-center py-3">
                <Compass className="size-12 bg-muted rounded-full p-1 cursor-pointer" />
            </div>
        </div>
    )
}
