import { AppSidebar } from "@/app-sidebar";
import FixedSidebar from '@/FixedSidebar';

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-[auto,auto,1fr] w-full">
            <FixedSidebar />
            <AppSidebar />

            {children}

        </div>
    );
}