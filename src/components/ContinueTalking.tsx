"use client";
import { Card } from '@/ui/card';
import Image from 'next/image';
import { cn, formatAddress } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import ChatInput from '@/ChatInput';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Chat } from '@/lib/dto';

export default function ContinueTalking(props: Chat){
    const router = useRouter();
    
    
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    function sendMessage(input: string | null){
        if (!input) return;
        // clear input
        inputRef.current!.value = '';
        //redirect to chat with message param set
        router.push(`/chat?agentId=${props.id}?message=${input}`);
    }
    
    return (
        <Card className="w-[40rem] pb-0 rounded-2xl overflow-hidden">
            {/*ai info section*/}
            <div className="flex h-20 rounded-3xl overflow-hidden p-1 pt-3">
                <Image
                    src={props.agent.image}
                    alt="Agent Image"
                    width={1000}
                    height={1000}
                    className="rounded-2xl w-28 aspect-square object-cover px-2 mr-2"
                />
                
                <div className="w-full mr-8">
                    <h2>{props.agent.name}</h2>
                    <div className="flex justify-between text-muted-foreground w-full">
                        <div className="flex">
                            <p className="">By {formatAddress(props.agent.creator.walletAddress)}</p>
                            
                            <div className="flex px-2">
                                <MessageSquare className="size-4 my-auto mr-1" />
                                {props.agent.totalMessages}
                            </div>
                        </div>
                        <div className="text-muted-foreground my-auto">
                            ${(props.agent.pricePerTokenUsd / 100).toFixed(2)}/token
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            
            {/*chat section*/}
            <div className="bg-muted h-60 grid grid-rows-[1fr,auto]">
                
                <div className="overflow-y-scroll scrollbar-hide">
                    {props.messages && props.messages.map((message, i) => (
                        <Message key={i} message={message.data.content} userSender={message.type === 'human'}/>
                    ))}
                </div>
            
                {/*message box*/}
                <div className="px-2">
                    <ChatInput inputRef={inputRef} onSend={sendMessage}/>
                    
                </div>
                
            </div>
        
        </Card>
    )
}

function Message({message, userSender}: {message: string, userSender: boolean}){
    return (
        <div className={cn('flex p-2 rounded-2xl', userSender ? 'float-right bg-primary ml-8' : 'float-left bg-secondary mr-8')}>
            <p className="text-xs">{message}</p>
        </div>
    )
}