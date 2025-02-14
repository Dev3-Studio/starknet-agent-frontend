'use client';

import ModelDescription from '@/ModelDescription';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createChat, getChats, sendMessage } from '@/actions/chats';
import { toast } from '@/ui/use-toast';
import { useEffect } from 'react';

export default function ChatPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const agentId = searchParams.get('agentId');
    const message = searchParams.get('message') ?? undefined;
    const mutation = useMutation({
        mutationFn: async (props: { agentId: string, message?: string }) => {
            const { agentId, message } = props;
            // Check if a chat already exists with the agent
            const chats = await getChats({ agentId, order: 'desc' });
            if ('error' in chats) throw new Error(chats.error);
            
            let chatId;
            
            if (chats.length > 0) {
                chatId = chats[0].id;
            } else {
                // Create a new chat with the agent
                let newChat = await createChat({ agent: agentId });
                if ('error' in newChat) throw new Error(newChat.error);
                chatId = newChat.id;
            }
            
            // Send the message if any
            if (message) {
                const updatedChat = await sendMessage(chatId, message);
                if ('error' in updatedChat) throw new Error(updatedChat.error);
            }
            return chatId;
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive',
            });
        },
        onSuccess: (chatId) => {
            router.push('/chat/' + chatId);
        },
    });
    
    useEffect(() => {
        if (agentId) mutation.mutate({ agentId, message });
    }, []);
    
    return (
        <div className="flex h-full">
            <div className="m-auto">
                <ModelDescription
                    name="Select an Agent"
                    description="Search or select an Agent from your sidebar"
                    image="/chat_placeholder.png"
                />
            </div>
        </div>
    );
}