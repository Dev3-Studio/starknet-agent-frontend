"use client";
import { Card } from '@/ui/card';
import { AgentPublic } from '@/lib/dto';
import Image from 'next/image';
import { formatAddress } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import ChatInput from '@/ChatInput';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ContinueTalking(props: AgentPublic){
    const router = useRouter();
    
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    function sendMessage(input: string | null){
        if (!input) return;
        // clear input
        inputRef.current!.value = '';
        //redirect to chat with message param set
        router.push(`/chat?agentId=${props.id}?message=${input}`);
    }
    
    // todo finish implement
    return (
        <Card>
            {/*ai info section*/}
            <div className="flex h-20 rounded-3xl overflow-hidden p-1">
                <Image
                    src={props.image}
                    alt="Agent Image"
                    width={1000}
                    height={1000}
                    className="rounded-2xl"
                />
                
                <div>
                    <h2>{props.name}</h2>
                    
                    <div className="flex text-muted-foreground">
                        
                        <p>By {formatAddress(props.creator.walletAddress)}</p>
                        
                        <div className="flex">
                            <MessageSquare className="size-4 my-auto mr-1" />
                            {props.totalMessages}
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            
            {/*chat section*/}
            <div className="bg-muted h-60 grid grid-rows-[1fr,auto]">
                
                <div className="overflow-y-scroll">
                
                </div>
            
                {/*message box*/}
                <ChatInput inputRef={inputRef} onSend={sendMessage}/>
                
            </div>
        
        </Card>
    )
}