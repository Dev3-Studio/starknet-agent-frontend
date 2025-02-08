import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppSidebar } from "@/components/app-sidebar";
import FixedSidebar from '@/FixedSidebar';
import { SidebarProvider } from '@/ui/sidebar';

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <div className="grid grid-cols-[auto,auto,1fr]">
                <FixedSidebar/>
                <AppSidebar />
                <div className="w-full">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}