"use client";
import { Card } from '@/ui/card';
import { MessageSquare } from 'lucide-react';
import { AgentPublic } from '@/lib/dto';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatAddress } from '@/lib/utils';
import AgentInfoDialog from '@/AgentInfoDialog';

export interface AgentCardProps {
    name: string;
    creator: string;
    description: string;
    image: string;
    numChats?: number;
    tags?: string[];
}
export default function AgentCard(props: AgentPublic) {
    
    const router = useRouter();
    
    function handleClick() {
        router.push(`/chat/?agentId=${props.id}`);
    }
    
    return (
        <Card className="shadow-lg rounded-3xl overflow-hidden w-[20rem] min-w-[22rem] flex p-4 relative" >
            <AgentInfoDialog agent={props} className="absolute top-4 right-4" />
            
            <Image
                className="w-32 h-full object-cover rounded-xl mr-4 cursor-pointer"
                src={props.image}
                alt="avatar"
                
                width={1000}
                height={1000}
                
                onClick={handleClick}
            />
            
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl">{props.name}</h1>
                <p className="text-sm text-muted-foreground">By: {formatAddress(props.creator.walletAddress)}</p>
                <p className="my-2 text-xs">{props.tagline}</p>
                <div className="flex">
                    <MessageSquare className="size-4 my-auto mr-1" />
                    {props.totalMessages}
                </div>
                <div className="bg-primary rounded-2xl w-fit px-2 text-xs text-white">
                    {props.tags && props.tags[0]}
                </div>
            </div>
        </Card>
    );

}