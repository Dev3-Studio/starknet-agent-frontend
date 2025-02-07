import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarTrigger,
} from '@/components/ui/sidebar';
import SearchBar from '@/SearchBar';
import UserInfo from '@/UserInfo';

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row items-center">
                <SearchBar/>
                <SidebarTrigger/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            
            <SidebarFooter>
                <UserInfo />
            </SidebarFooter>
        </Sidebar>
    )
}
