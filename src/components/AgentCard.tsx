import { Card } from '@/ui/card';

interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
}
export default function AgentCard(props: AgentCardProps) {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden cursor-pointer">
            <img
                className="w-full h-56 object-cover object-center"
                src={props.image}
                alt="avatar"
            />
            <div className="p-4">
                <h1 className="text-2xl font-bold">{props.name}</h1>
                <p className="text-sm text-muted-foreground">By: {props.creator}</p>
                <p className="mt-2">{props.description}</p>
            </div>
        </Card>
    );
    
}