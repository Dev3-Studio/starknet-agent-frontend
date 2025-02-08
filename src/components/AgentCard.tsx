import { Card } from '@/ui/card';
import { MessageSquare } from 'lucide-react';

interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
    numChats?: number;
    tags?: string[];
}
export default function AgentCard(props: AgentCardProps) {
    return (
        <Card className="shadow-lg rounded-lg overflow-hidden cursor-pointer min-w-80 flex p-4">
            <div className="w-36 h-full">
                <img
                    className=""
                    src={props.image}
                    alt="avatar"
                />
            </div>
            <div className="p-4">
                <h1 className="text-2xl">{props.name}</h1>
                <p className="text-sm text-muted-foreground">By: {props.creator}</p>
                <p className="my-2">{props.description}</p>
                <div className="flex">
                    <MessageSquare />
                    2.5m
                </div>
                <div className="bg-primary rounded-2xl">
                    {props.tags && props.tags[0]}
                </div>
            </div>
        </Card>
    );
    
}