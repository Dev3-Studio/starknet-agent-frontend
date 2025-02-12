import AgentCard from '@/AgentCard';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import Image from 'next/image';
import code from '@/public/code.png'
import { Heart, MessageSquare, Search } from 'lucide-react';
import { Input } from '@/ui/input';
import AgentWithSuggestions from '@/AgentWithSuggestions';

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
            {/* Hero Section */}
            <div className="px-10">
                <section className="h-80 bg-hero-gradient rounded-2xl">
                    <div className="flex flex-col justify-center h-full w-full max-w-2xl mx-auto px-4">
                        <h1 className="text-center text-4xl mb-4">Scale your professional workforce with Ai Agents</h1>
                        <div className="flex bg-muted rounded-xl">
                            <Input className="placeholder:text-foreground focus-visible:ring-0 my-auto border-0" placeholder="Search for any agent service.."/>
                            <Button className="my-1 mr-2"><Search className="-mx-1"/></Button>
                        </div>
                    </div>
                </section>
            </div>
            
            {/* Featured Agents */}
            <section>
                <div className="px-4">
                    <h2 className="text-lg font-light mb-4">Featured Agents</h2>
                </div>
                <div className="flex justify-center">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-full">
                        {agents.map((agent, index) => (
                            <AgentCard key={index} {...agent} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Talk to an Agent */}
            <section>
                <div className="px-4">
                    <h2 className="text-lg font-light mb-4">Talk to an agent</h2>
                </div>
                <div className="flex justify-center">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-full">
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                        <AgentWithSuggestions name="" creator="" description="" image=""/>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <div className="px-10">
                <section className="text-center bg-[url(../../public/space.jpg)] bg-cover bg-center bg-no-repeat rounded-2xl p-8 bg-blend-darken bg-black bg-opacity-50">
                    <h2 className="text-3xl font-bold mb-4">Forge you own AI agent expert</h2>
                    <p className="font-light mb-8">Develop, Train & Deploy AI Agents for Businesses—Transform Your Prompting Skills into a Scalable Passive Income Stream</p>
                    <Button className="px-16 font-light rounded-xl">Forge your agent</Button>
                </section>
            </div>
            
            {/* Cards Section */}
            <section>
                <div className="flex justify-center">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-full">
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
                    </div>
                </div>
            </section>
        </main>
    );
}