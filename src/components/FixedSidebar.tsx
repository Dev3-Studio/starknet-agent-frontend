import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarTrigger,
} from '@/components/ui/sidebar';
import SearchBar from '@/SearchBar';
import UserInfo from '@/UserInfo';
import Logo from '@/public/logo.svg';

export default function FixedSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
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
