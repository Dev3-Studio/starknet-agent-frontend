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
                    <h3 className="text-muted-foreground">Recently Used</h3>
                    {/*todo show 3 most recent ai*/}
                    <RecentAICard/>
                    
                </SidebarGroup>
                <SidebarGroup>
                    <h3 className="text-muted-foreground">Chat History</h3>
                    <ChatHistory/>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>
                <UserInfo />
            </SidebarFooter>
        </Sidebar>
    )
}
