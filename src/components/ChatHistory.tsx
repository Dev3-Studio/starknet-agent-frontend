import { Button } from '@/ui/button';


const placeholderChats = [
    {
        chatTitle: 'Chat with AI',
        chatId: '123',
        timestamp: new Date()
    },
    {
        chatTitle: 'Maths Question',
        chatId: '124',
        timestamp: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
        chatTitle: 'What is the fastest animal',
        chatId: '125',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
]
// todo fetch and display all recent ai chats
export default function ChatHistory() {
    return (
        <div className="grid gap-2">
            {placeholderChats.map((chat, key) => {
                return (
                    <ChatButton key={key} chatTitle={chat.chatTitle} chatId={chat.chatId} timestamp={chat.timestamp}/>
                )
            })}
        </div>
    )
}

function ChatButton({chatTitle, chatId, timestamp}: {chatTitle: string, chatId: string, timestamp: Date}) {
    return(
    <Button variant="ghost" className="flex justify-between">
        <h3>{chatTitle}</h3>
        <p className="text-muted-foreground text-xs">{timestamp.toDateString()}</p>
    </Button>)
}