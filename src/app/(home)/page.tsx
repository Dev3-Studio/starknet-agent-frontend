import AgentCard from '@/AgentCard';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import Image from 'next/image';
import code from '@/public/code.png'
import { Heart, MessageSquare, Search } from 'lucide-react';
import { Input } from '@/ui/input';
import AgentWithSuggestions from '@/AgentWithSuggestions';
import HorizontalScroll from '@/HorizontalScroll';
import left from '@/public/left.png';
import right from '@/public/right.png';
import useMediaQuery from '@/hooks/use-media-query';
import { Hero } from '@/Hero';

interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
    numChats?: number;
    tags?: string[];
}

const agents: AgentCardProps[] = [
    {creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Astra"},
    {creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Breach"},
    {creator: "Riot Games", description: "Tagline of ai agent here", image: "https://placehold.co/150", name: "Brimstone"},
]

export default function Home() {
    
    
    return (
        <main className="w-full mx-auto space-y-8 overflow-x-hidden">
            <Hero/>
            
            {/* Featured Agents */}
            <section className="">
                <div className="px-4 max-w-custom w-full mx-auto">
                    <h2 className="text-lg font-light mb-4">Featured Agents</h2>
                </div>
                <div className="flex justify-center">
                    <HorizontalScroll>
                        {agents.map((agent, index) => (
                            <AgentCard key={index} {...agent} />
                        ))}
                    </HorizontalScroll>
                </div>
            </section>
            
            {/* Talk to an Agent */}
            <section className="mx-auto">
                <div className="px-4 max-w-custom w-full mx-auto">
                    <h2 className="text-lg font-light mb-4">Talk to an agent</h2>
                </div>
                <div className="flex justify-center">
                    <HorizontalScroll>
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                    </HorizontalScroll>
                </div>
            </section>
            
            {/* CTA Section */}
            <div className="px-10">
                <section className="text-center bg-[url(../../public/space.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl bg-blend-darken px-20 py-16 bg-black bg-opacity-50 max-w-custom mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Forge you own AI agent expert</h2>
                    <p className="font-light mb-8">Develop, Train & Deploy AI Agents for Businesses—Transform Your Prompting Skills into a Scalable Passive Income Stream</p>
                    <Button className="px-16 font-light rounded-xl">Forge your agent</Button>
                </section>
            </div>
            
            {/* Cards Section */}
            <section className="">
                <div className="flex justify-center mb-4">
                    <HorizontalScroll>
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video" src={code} alt="Code"/>
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                No coding required
                            </CardHeader>
                            <CardContent className="text-sm">
                                Easily teach, train, and customize AI agents for your business
                            </CardContent>
                        </Card>
                        
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video" src={code} alt="Code"/>
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                Teach your processes
                            </CardHeader>
                            <CardContent className="text-sm">
                                Turn your processes into instructions for your AI agents.
                            </CardContent>
                        </Card>
                        
                        <Card className="w-[20rem] shrink-0 p-4">
                            <Image className="w-full aspect-video" src={code} alt="Code"/>
                            <CardHeader className="text-foreground text-xl pb-2 pt-4">
                                Guide your AI Agents skills
                            </CardHeader>
                            <CardContent className="text-sm">
                                Equip AI agents with AI Tools that give them abilities, from searching Google to transcribing a YouTube video and much more.
                            </CardContent>
                        </Card>
                    </HorizontalScroll>
                </div>
            </section>
        </main>
    );
}