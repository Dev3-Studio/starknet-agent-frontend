'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from '@/components/ui/sidebar';
import SearchBar from '@/SearchBar';
import UserInfo from '@/UserInfo';
import { Button } from '@/ui/button';
import { ArrowLeftToLine } from 'lucide-react';
import ChatHistory from '@/ChatHistory';
import RecentAICard from '@/RecentAICard';
import HorizontalScroll from '@/HorizontalScroll';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getChat, getChats } from '@/actions/chats';


export function AppSidebar() {
    const router = useRouter();
    const { toggleSidebar } = useSidebar();
    const pathname = usePathname();
    const { data: currentChat } = useQuery({
        queryKey: ['agent', pathname],
        queryFn: async () => {
            const regex = /\/chat\/(.*)/;
            const match = pathname.match(regex);
            if (!match) return null;
            return await getChat(match[1]);
        }
    });
    const { data: recentChats } = useQuery({
        queryKey: ['recentChats'],
        queryFn: async () => {
            return await getChats({ order: 'desc' });
        }
    });
    
    if (recentChats && 'error' in recentChats) return router.push('/?error=unauthorized')
    
    return (
        <Sidebar side="left" className="h-full">
            <SidebarHeader className="flex flex-row items-center">
                <SearchBar/>
                <Button variant="ghost" onClick={toggleSidebar}>
                    <ArrowLeftToLine />
                </Button>
            </SidebarHeader>
            <SidebarContent>
                {recentChats && <SidebarGroup>
                    <h3 className="text-muted-foreground mb-2">Recently Used</h3>
                    <HorizontalScroll>
                        {recentChats.map((ai, key) => {
                            return <RecentAICard key={key} {...ai}/>;
                        })}
                    </HorizontalScroll>
                
                </SidebarGroup>}
                {recentChats && <SidebarGroup>
                    <h3 className="text-muted-foreground mb-2">Chat History</h3>
                    <ChatHistory {...recentChats}/>
                </SidebarGroup>}
            </SidebarContent>
            
            <SidebarFooter className="p-0">
                <UserInfo />
            </SidebarFooter>
        </Sidebar>
    )
}
