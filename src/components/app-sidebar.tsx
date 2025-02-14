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
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getChat, getChats } from '@/actions/chats';

const placehodlderAIs = [
    {
        name: 'Map AI',
        description: 'AI that generates maps based on user input',
        image: 'https://placehold.co/150',
        creator: 'Shadcn',
        tagline: 'Generate maps from text',
    },
    {
        name: 'Chat AI',
        description: 'AI that generates chat messages based on user input',
        image: 'https://placehold.co/150',
        creator: 'Shadcn',
        tagline: 'Generate chat messages from text',
    },
    {
        name: 'Code AI',
        description: 'AI that generates code based on user input',
        image: 'https://placehold.co/150',
        creator: 'Shadcn',
        tagline: 'Generate code from text',
    }
]

export function AppSidebar() {
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
    
    return (
        <Sidebar side="left" className="h-full">
            <SidebarHeader className="flex flex-row items-center">
                <SearchBar/>
                <Button variant="ghost" onClick={toggleSidebar}>
                    <ArrowLeftToLine />
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <h3 className="text-muted-foreground mb-2">Recently Used</h3>
                    <HorizontalScroll>
                    {placehodlderAIs.map((ai, key) => {
                        return <RecentAICard key={key} {...ai}/>
                    })}
                    </HorizontalScroll>
                    
                </SidebarGroup>
                <SidebarGroup>
                    <h3 className="text-muted-foreground mb-2">Chat History</h3>
                    <ChatHistory/>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter className="p-0">
                <UserInfo />
            </SidebarFooter>
        </Sidebar>
    )
}
