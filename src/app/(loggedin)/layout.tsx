import AppSidebar from '@/app-sidebar';
import FixedSidebar from '@/FixedSidebar';
import { auth } from '@/config/auth';
import { redirect } from 'next/navigation';

export default async function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (!session) redirect('/?error=unauthorized');
    
    return (
        <div className="relative w-full">
            <div className="fixed top-0 left-0 h-full">
                <FixedSidebar/>
            </div>
            <div className="grid grid-cols-[auto,1fr] pl-24">
                <AppSidebar />
                {children}
            </div>
        </div>
    );
}