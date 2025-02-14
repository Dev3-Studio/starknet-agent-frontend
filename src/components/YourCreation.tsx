"use client";
import { AgentPublic } from '@/lib/dto';
import { Card } from '@/ui/card';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function YourCreation(props: AgentPublic) {
    
    const router = useRouter();
    
    function handleClick() {
        router.push(`/chat/?agentId=${props.id}`);
    }
    
    return (
        <Card className="w-60 h-72 p-0 rounded-3xl overflow-hidden cursor-pointer ring-2 ring-muted-foreground my-1" onClick={handleClick}>
            <div className="relative h-44">
                <Image
                    src={props.image}
                    alt="avatar"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            
            <div className="flex flex-col items-center p-4 gap-1 h-auto z-10 rounded-2xl overflow-visible">
                <div className="inline-block px-3 py-1 bg-primary rounded-lg text-sm">
                    {props.tags}
                </div>
                
                <h2 className="text-lg font-semibold truncate max-w-full">
                    {props.name}
                </h2>
                <div className="flex text-muted-foreground -mt-1">
                    <MessageSquare className="size-4 my-auto mr-1" />
                    {props.totalMessages}
                </div>
            </div>
        </Card>
    );
}