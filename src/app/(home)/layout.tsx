import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // header, page, footer
        <div className="h-full grid grid-rows-[auto,1fr,auto] min-h-screen w-full">
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
