import AgentCard from '@/AgentCard';

interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
}

// placeholder components
const agents: AgentCardProps[] = [
    {creator: "Riot Games", description: "Astra is a Controller agent in VALORANT.", image: "https://placehold.co/600x400", name: "Astra"},
    {creator: "Riot Games", description: "Breach fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground.", image: "https://placehold.co/600x400", name: "Breach"},
    {creator: "Riot Games", description: "Brimstone’s orbital arsenal ensures his squad always has the advantage.", image: "https://placehold.co/600x400", name: "Brimstone"},
]

export default function Home() {
    
    
    
    
    
    return (
        <main className="p-10">
            
            <div className="grid grid-cols-3 gap-10">
                {agents.map((agent) => (
                <AgentCard {...agent}/>
                ))}
            </div>
            
        </main>
    );
}
