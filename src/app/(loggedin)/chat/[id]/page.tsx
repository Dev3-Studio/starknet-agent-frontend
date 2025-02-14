'use client';
import ChatInput from '@/ChatInput';
import { useRef, useState, useEffect, useMemo } from 'react';
import ModelDescription from '@/ModelDescription';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getChat, sendMessage } from '@/actions/chats';
import { toast } from '@/ui/use-toast';
import { cn } from '@/lib/utils';

type Message = {
    type: 'user' | 'ai';
    data: {
        content: string;
    };
};

export default function ChatPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const pathRegex = /\/chat\/(.*)/;
    const pathMatch = pathname.match(pathRegex);
    const chatId = pathMatch ? pathMatch[1] : '';
    
    const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);
    
    const { data: chat, isError, refetch: refetchChat } = useQuery({
        queryKey: ['chat', chatId],
        queryFn: async () => {
            const res = await getChat(chatId);
            if ('error' in res) throw new Error(res.error);
            return res;
        },
    });
    
    const agent = chat?.agent;
    
    // Memoize messages array
    const messages = useMemo(() =>
            [...(chat?.messages ?? []), ...optimisticMessages],
        [chat?.messages, optimisticMessages]
    );
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const handleSend = async (message: string) => {
        const optimisticMessage: Message = {
            type: 'user',
            data: { content: message }
        };
        setOptimisticMessages(prev => [...prev, optimisticMessage]);
        
        try {
            const res = await sendMessage(chatId, message);
            if ('error' in res) {
                throw new Error(res.error);
            }
            
            setOptimisticMessages([]);
            await refetchChat();
            
        } catch (error) {
            setOptimisticMessages(prev => prev.filter(msg => msg !== optimisticMessage));
            
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to send message',
                variant: 'destructive',
            });
        }
    };
    
    if (isError) return (
        <div className="flex h-full w-full">
            <div className="m-auto">Error loading chat</div>
        </div>
    );
    
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex flex-col flex-1 w-full max-w-screen-md mx-auto relative h-full">
                <div className="flex-1 overflow-y-auto px-2 pb-4">
                    {agent && messages.length === 0 && (
                        <div className="h-full flex items-center justify-center">
                            <ModelDescription
                                name={agent.name}
                                description={agent.description}
                                image={agent.image}
                            />
                        </div>
                    )}
                    
                    {agent && messages.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {messages.map((message, key) => (
                                <div key={key} className={cn(
                                    "flex w-full",
                                    message.type === 'ai' ? 'justify-start' : 'justify-end'
                                )}>
                                    <div
                                        className={cn(
                                            "p-2 rounded-lg",
                                            message.type === 'ai'
                                                ? 'rounded-bl-none mr-16 bg-accent'
                                                : 'rounded-br-none ml-16 bg-accent/80'
                                        )}
                                    >
                                        {message.data.content}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                
                <div className="sticky bottom-0 left-0 right-0 bg-background">
                    <ChatInput inputRef={inputRef} onSend={handleSend}/>
                </div>
            </div>
        </div>
    );
}