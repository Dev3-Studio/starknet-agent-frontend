'use client';
import { Button } from '@/ui/button';
import { Chat } from '@/lib/dto';
import { useRouter } from 'next/navigation';


export default function ChatHistory(chats?: Chat[]) {
    
    
    function getRecentMessage(chat: Chat){
        // return last message in array
        if (!chat.messages || chat.messages.length === 0) return null;
        
        return chat.messages[chat.messages.length - 1];
    }
    
    return (
        <div className="grid gap-2">
            {chats && chats?.length > 0 && chats.map((chat, key) => {
                return (
                    <ChatButton
                        key={key}
                        chatTitle={chat.title!}
                        chatId={chat.id}
                        message={getRecentMessage(chat)?.data.content ?? ''}
                    />
                )
            })}
        </div>
    )
}

function ChatButton({chatTitle, chatId, message}: {chatTitle: string, chatId: string, message: string}) {
    const router = useRouter();
    
    return(
    <Button variant="ghost" className="flex justify-between" onClick={() => router.push(`/chat/${chatId}`)}>
        <h3>{chatTitle}</h3>
        <p className="text-muted-foreground text-xs">{message}</p>
    </Button>)
}