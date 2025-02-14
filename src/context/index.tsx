'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/ui/toaster';
import StarknetProvider from '@/StarknetProvider';
import { SidebarProvider } from '@/ui/sidebar';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <SessionProvider>
                    <StarknetProvider>
                        <SidebarProvider>
                            {children}
                        </SidebarProvider>
                        <Toaster/>
                    </StarknetProvider>
                </SessionProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}