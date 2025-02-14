"use client";
import AgentCard from '@/AgentCard';
import { Card, CardContent, CardHeader } from '@/ui/card';
import Image from 'next/image';
import code from '@/public/code.png'
import AgentWithSuggestions from '@/AgentWithSuggestions';
import HorizontalScroll from '@/HorizontalScroll';
import { Hero } from '@/Hero';
import RedirectButton from '@/RedirectButton';
import AgentCategoryFilter from '@/AgentCategoryFilter';
import { useAtom } from 'jotai/index';
import { dialogOpenAtom } from '@/WalletConnectButton';
import { getAgents } from '@/actions/agents';
import { useQuery } from '@tanstack/react-query';
import puzzle from '@/public/puzzle.png';
import computer from '@/public/computer.jpg';

export default function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    
    const popularAgents = useQuery({
        queryKey: ['popularAgents'],
        queryFn: async () => {
            const res = await getAgents({ limit: 6, sort: 'chats', order: 'desc' });
            if ('error' in res) return [];
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
    
    
    const [, setIsOpen] = useAtom(dialogOpenAtom);
    
    
    if (searchParams.error === 'unauthorized') {
        setIsOpen({ open: true, redirect: '/' });
        // remove searchParams.error
        delete searchParams.error;
    }
    
    return (
        <main className="w-full mx-auto space-y-8 overflow-x-hidden">
            <Hero />

            {/* Featured Agents */}
            <section className="flex flex-col items-center">
                <div className="px-4 max-w-custom w-full mx-auto">
                    <h2 className="text-lg font-light mb-4">Featured Agents</h2>
                </div>
                <HorizontalScroll>
                    {
                        !popularAgents.data || popularAgents.data.length === 0 && <p>No agents found</p>
                    }
                    
                    {popularAgents.data && popularAgents.data.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </HorizontalScroll>
            </section>

            {/* Agent Categories section */}
            <AgentCategoryFilter />
            

            {/* Talk to an Agent */}
            <section className="mx-auto">
                <div className="px-4 max-w-custom w-full mx-auto">
                    <h2 className="text-lg font-light mb-4">Talk to an agent</h2>
                </div>
                <div className="flex justify-center">
                    <HorizontalScroll>
                        {popularAgents.data && popularAgents.data.map((agent, index) => (
                            <AgentWithSuggestions key={index} {...agent} />
                        ))
                        }
                    </HorizontalScroll>
                </div>
            </section>

            {/* CTA Section */}
            <div className="sm:px-10 px-2">
                <section className="text-center bg-[url(../../public/space.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl bg-blend-darken sm:px-20 px-10 py-16 bg-black bg-opacity-50 max-w-custom mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Forge your own AI agent expert</h2>
                    <p className="font-light mb-8">Develop, Train & Deploy AI Agents for Businesses—Transform Your Prompting Skills into a Scalable Passive Income Stream</p>
                    <RedirectButton/>
                </section>
            </div>
            
            {/* Cards Section */}
            <section className="">
                <div className="flex justify-center mb-4">
                    <HorizontalScroll>
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video" src={code} alt="No-code AI" />
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                No-Code AI Customization
                            </CardHeader>
                            <CardContent className="text-sm">
                                Effortlessly design, train, and deploy AI agents tailored to your business needs.
                            </CardContent>
                        </Card>
                        
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video object-cover" src={computer} alt="Process Automation" />
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                Automate Your Workflows
                            </CardHeader>
                            <CardContent className="text-sm">
                                Transform your business processes into step-by-step instructions for AI agents.
                            </CardContent>
                        </Card>
                        
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video object-cover" src={puzzle} alt="AI Skills" />
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                Empower AI with Skills
                            </CardHeader>
                            <CardContent className="text-sm">
                                Provide AI agents with powerful tools for web searches, video transcription, and more.
                            </CardContent>
                        </Card>
                    </HorizontalScroll>
                </div>
            </section>
        </main>
    );
}