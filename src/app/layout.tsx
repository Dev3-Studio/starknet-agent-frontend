import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import StarknetProvider from '@/components/StarknetProvider';
import { SidebarProvider } from '@/ui/sidebar';
const inter = Inter({ subsets: ['latin'] });
import { SetMetadata } from '@/metadata';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { TooltipProvider } from '@/ui/tooltip';

/*##################################################################
 * Do not change metadata below, change it in the metadata.ts file *
 *#################################################################*/
const openGraph: OpenGraph = {
    title: SetMetadata.title,
    description: SetMetadata.description,
    // workaround as we cant use as const in metadata.ts
    type: SetMetadata.type as 'website',
    siteName: SetMetadata.siteName,
    url: SetMetadata.url,
    images: [SetMetadata.image],
}

export const metadata: Metadata = {
    title: SetMetadata.title,
    description: SetMetadata.description,
    creator: SetMetadata.author,
    openGraph: openGraph,
    // oembed link workaround
    icons: {
        other: {
            rel: 'alternate',
            url: `${process.env.SITE_URL}/oembed.json`,
            type: 'application/json+oembed',
        },
    }
};

export const viewport: Viewport = {
    themeColor: SetMetadata.themeColor,
}


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <StarknetProvider>
                        <SidebarProvider>
                            <TooltipProvider>
                            {children}
                            </TooltipProvider>
                        </SidebarProvider>
                        <Toaster/>
                    </StarknetProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
