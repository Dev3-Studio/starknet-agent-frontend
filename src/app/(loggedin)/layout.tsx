import { AppSidebar } from "@/app-sidebar";
import FixedSidebar from '@/FixedSidebar';

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative w-full">
            <div className="fixed top-0 left-0 h-full">
                <FixedSidebar />
            </div>
            <div className="grid grid-cols-[auto,1fr] pl-24">
                <AppSidebar />
                {children}
            </div>
        </div>
    );
}