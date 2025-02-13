import { Card } from '@/ui/card';
import { MessageSquare, Heart } from 'lucide-react';
import { Button } from './ui/button';

export interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
    numChats?: number;
    tags?: string[];
}
export default function AgentCard(props: AgentCardProps) {
    return (
        <Card className="shadow-lg rounded-3xl overflow-hidden cursor-pointer w-[20rem] min-w-[22rem] flex p-4">

            <div className="w-36 h-auto grid content-center">
                <img
                    className="w-32 h-full object-cover rounded-xl"
                    src={props.image}
                    alt="avatar"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl">{props.name}</h1>
                <p className="text-sm text-muted-foreground">By: {props.creator}</p>
                <p className="my-2 text-xs">{props.description}</p>
                <div className="flex">
                    <MessageSquare className="size-4 my-auto mr-1" />
                    2.5m
                </div>
                <div className="bg-primary rounded-2xl">
                    {props.tags && props.tags[0]}
                </div>
                <Button>Digital Marketing</Button>
            </div>
            <div>
                <Heart />
            </div>
        </Card>
    );

}