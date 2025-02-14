'use client';

import Logo from '@/public/logo.svg';
import { useSidebar } from '@/ui/sidebar';
import { ArrowLeftToLine, ArrowRightToLine, Bookmark, CircleUser, Compass, Plus } from 'lucide-react';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import AgentIcon from '@/AgentIcon';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '@/actions/chats';

export default function FixedSidebar() {
    const { toggleSidebar, open } = useSidebar();
    const router = useRouter();
    const pathname = usePathname();
    const { data: recentChats } = useQuery({
        queryKey: ['recentChats'],
        queryFn: async () => {
            return await getChats({ order: 'desc' });
        },
    });
    
    const fetchCurrentAgent = () => {
        if (!pathname) return null;
        const regex = /\/chat\/(.*)/;
        const match = pathname.match(regex);
        if (!match) return null;
        const chatId = match[1];
        if (!recentChats || ('error' in recentChats)) return null;
        const chat = recentChats.find(c => c.id === chatId);
        if (!chat) return null;
        return chat.agent.id;
    };
    
    const fetchRecentAgents = () => {
        if (!recentChats || ('error' in recentChats)) return [];
        const recentAgentIds = recentChats.map(c => c.agent.id);
        const uniqueAgentIds = Array.from(new Set(recentAgentIds));
        return uniqueAgentIds.map(id => recentChats.find(c => c.agent.id === id)!.agent);
    }
    
    const currentAgentId = fetchCurrentAgent();
    const recentAgents = fetchRecentAgents();
    
    return (
        <div className="h-full w-24 bg-muted text-white z-20 grid grid-rows-[auto,auto,1fr,auto] max-h-screen fixed">
            
            <div className="flex flex-col  mt-4">
                <div onClick={() => router.push('/')} className="flex justify-center">
                    <Logo className="p-4 w-full -mb-2 cursor-pointer"/>
                </div>
                <Button variant="ghost" onClick={toggleSidebar}>
                    {!open && <ArrowRightToLine/>}
                    {open && <ArrowLeftToLine/>}
                </Button>
            </div>
            
            <div className="flex flex-col items-center gap-4 px-3">
                <Separator className="w-full h-[2px] bg-accent"/>
                
                <Plus className="size-12 rounded-full bg-background border-foreground border cursor-pointer" onClick={()=> router.push('/forge-agent')}/>
                
                <Separator className="w-full h-[2px] bg-accent"/>
            </div>
            
            <div className="flex flex-col items-center gap-4 pt-4 overflow-y-scroll scrollbar-hide px-5">
                {recentAgents.map((agent) => (
                    <AgentIcon
                        key={agent.id}
                        src={agent.image}
                        name={agent.name}
                        active={currentAgentId === agent.id}
                        id={agent.id}
                    />
                ))}
            </div>
            
            
            <div className="bg-background w-full flex justify-center h-20">
                <Compass className="size-14 bg-muted rounded-full p-1 cursor-pointer my-auto"
                         onClick={() => router.push('/user')}
                />
            </div>
        </div>
    );
}
