'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import SearchBar from '@/SearchBar';
import UserInfo from '@/UserInfo';
import { Button } from '@/ui/button';
import { ArrowLeftToLine } from 'lucide-react';
import ChatHistory from '@/ChatHistory';
import RecentAICard from '@/RecentAICard';
import { LLMModel } from '@/lib/types';
import HorizontalScroll from '@/HorizontalScroll';

const placehodlderAIs: LLMModel[] = [
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
    return (
        <Sidebar side="left" className="">
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
