import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SetMetadata } from '@/metadata';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import Providers from '@/context';

const inter = Inter({ subsets: ['latin'] });

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
};

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
    },
};

export const viewport: Viewport = {
    themeColor: SetMetadata.themeColor,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
