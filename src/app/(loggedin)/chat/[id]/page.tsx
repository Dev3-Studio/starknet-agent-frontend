'use client';
import ChatInput from '@/ChatInput';
import { useRef } from 'react';
import ModelDescription from '@/ModelDescription';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getChat, sendMessage } from '@/actions/chats';
import { toast } from '@/ui/use-toast';
import { cn } from '@/lib/utils';

export default function ChatPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const pathRegex = /\/chat\/(.*)/;
    const pathMatch = pathname.match(pathRegex);
    const chatId = pathMatch ? pathMatch[1] : '';
    const { data: chat, isError, refetch: refetchChat } = useQuery({
        queryKey: ['chat', chatId],
        queryFn: async () => {
            const res = await getChat(chatId);
            if ('error' in res) throw new Error(res.error);
            return res;
        },
    });
    const agent = chat?.agent;
    const messages = chat?.messages ?? [];
    
    const handleSend = async (message: string) => {
        // Send the message and update the chat
        const res = await sendMessage(chatId, message);
        if ('error' in res) {
            toast({
                title: 'Error',
                description: res.error,
                variant: 'destructive',
            });
            return;
        }
        await refetchChat();
    };
    
    if (isError) return <div className="flex h-full w-full">
        <div className="m-auto">Error loading chat</div>
    </div>;
    
    return (
        <div className="flex h-full w-full">
            <div className="grid grid-rows-[1fr,auto] h-full max-w-screen-md mx-auto">
                {/*show description when no messages*/}
                {agent && messages.length === 0 && <ModelDescription
                    name={agent.name}
                    description={agent.description}
                    image={agent.image}
                />}
                
                {/*else show messages*/}
                <div className="flex flex-col gap-4 px-2 overflow-y-auto">
                    {agent && messages.length > 0 && messages.map((message, key) => (
                        <div key={key} className={cn(
                            "flex w-full",
                            message.type === 'ai' ? 'justify-start' : 'justify-end'
                        )}>
                            <div
                                className={cn(
                                    "p-2 rounded-lg bg-accent",
                                    message.type === 'ai' ? 'rounded-bl-none mr-16' : 'rounded-br-none ml-16'
                                )}
                            >
                                {message.data.content}
                            </div>
                        </div>
                    ))}
                </div>
                
                <ChatInput inputRef={inputRef} onSend={handleSend}/>
            </div>
        </div>
    );
}