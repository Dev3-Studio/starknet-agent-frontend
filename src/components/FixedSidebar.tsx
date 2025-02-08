'use client';
import Logo from '@/public/logo.svg';
import { useSidebar } from '@/ui/sidebar';
import { ArrowLeftToLine, ArrowRightToLine, Bookmark, Compass, Plus } from 'lucide-react';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { useRouter } from 'next/navigation';
import AgentIcon from '@/AgentIcon';


const placeHolderAI = [
    {name: 'Example Name', id: '1', src: 'https://placehold.co/150'},
    {name: 'AI 2', id: '2'},
    {name: 'AI 3', id: '3'},
    {name: 'AI 4', id: '4'},
    {name: 'AI 5', id: '5'},
    {name: 'AI 6', id: '6'},
    {name: 'AI 7', id: '7'},
    {name: 'AI 8', id: '8'},
    {name: 'AI 9', id: '9'},
    {name: 'AI 10', id: '10'},
]
export default function FixedSidebar() {
    const { toggleSidebar, open } = useSidebar();
    const router = useRouter();
    return (
        <div className="h-full w-24 bg-muted text-white z-20 grid grid-rows-[auto,auto,1fr,auto] max-h-screen">

            <div className="flex flex-col  mt-4">
                <div onClick={() => router.push('/')} className="flex justify-center">
                    <Logo className="p-4 w-full -mb-2 cursor-pointer" />
                </div>
                <Button variant="ghost" onClick={toggleSidebar}>
                    {!open && <ArrowRightToLine/>}
                    {open && <ArrowLeftToLine />}
                </Button>
            </div>
            
            <div className="flex flex-col items-center gap-4 px-3">
                <Separator className="w-full h-[2px] bg-accent"/>
                
                <Plus className="size-8 rounded-full bg-background border-foreground border cursor-pointer"/>
                <Bookmark className="size-8 fill-foreground cursor-pointer"/>
                
                <Separator className="w-full h-[2px] bg-accent"/>
            </div>
            
            <div className="flex flex-col items-center gap-4 pt-4 overflow-y-scroll scrollbar-hide px-5">
                {placeHolderAI.map((ai) => (
                    <AgentIcon {...ai} />))
                }
            </div>
            
            
            <div className="bg-background w-full flex justify-center py-3">
                <Compass className="size-12 bg-muted rounded-full p-1 cursor-pointer" />
            </div>
        </div>
    )
}
