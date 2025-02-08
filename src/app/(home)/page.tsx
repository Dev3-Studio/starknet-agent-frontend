import AgentCard from '@/AgentCard';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader } from '@/ui/card';
import Image from 'next/image';
import code from '@/public/code.png'
import { Heart, MessageSquare, Search } from 'lucide-react';
import { Input } from '@/ui/input';

interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
    numChats?: number;
    tags?: string[];
}

// placeholder components
const agents: AgentCardProps[] = [
    {creator: "Riot Games", description: "Astra is a Controller agent in VALORANT.", image: "https://placehold.co/150", name: "Astra"},
    {creator: "Riot Games", description: "Breach fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground.", image: "https://placehold.co/150", name: "Breach"},
    {creator: "Riot Games", description: "Brimstone’s orbital arsenal ensures his squad always has the advantage.", image: "https://placehold.co/150", name: "Brimstone"},
]

export default function Home() {
    
    return (
        <main className="">
            <section>
                <h1 className="text-center text-4xl">Scale your professional workforce with Ai Agents</h1>
                
                <div className="flex bg-muted rounded-xl">
                    <Input className="placeholder:text-foreground focus-visible:ring-0 my-auto border-0" placeholder="Search for any agent service.."/>
                    <Button className="my-1 mr-2"><Search className="-mx-1"/></Button>
                </div>
            </section>
            
            <section>
                <h2 className="text-lg font-light">Featured Agents</h2>
                
                <div className="flex overflow-x-scroll scrollbar-hide gap-4 max-w-[100vw]">
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-lg font-light">Talk to an agent</h2>
                <div className="rounded-2xl border-accent border-2 py-10">
                    
                    <div className="flex w-fit mx-auto">
                        <img className="w-20 rounded-2xl" src="https://placehold.co/150" alt="Agent" />
                        <div className="my-auto ml-4">
                            <h3>Ai Agent Name</h3>
                            <div className="flex gap-2 text-muted-foreground">
                                <p>By @Usercreator</p>
                                <div className="flex">
                                    <MessageSquare />
                                    2.5m
                                </div>
                                <div className="flex">
                                    <Heart />
                                    6.380
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-fit mx-auto mt-4 flex flex-col gap-1 ">
                        <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
                        <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
                        <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
                    </div>
                </div>
            </section>
            
            <section className="text-center">
                <h2 className="text-3xl font-light mb-4">Forge you own AI agent expert</h2>
                <p className="font-light mb-8">Develop, Train & Deploy AI Agents for Businesses—Transform Your Prompting Skills into a Scalable Passive Income Stream</p>
                
                <Button className="px-16 font-light rounded-xl">Forge your agent</Button>
            </section>
            
            <section className="overflow-x-scroll scrollbar-hide gap-4">
                <Card className="w-80 p-4">
                    <Image className="w-full" src={code} alt="Code"/>
                    <CardHeader className="text-foreground text-2xl pb-2">
                        No coding required
                    </CardHeader>
                    <CardContent className="text-sm">
                        Easily teach, train, and customize AI agents for your business
                    </CardContent>
                </Card>
            </section>
        
        </main>
    );
}
