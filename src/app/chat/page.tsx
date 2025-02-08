'use client';
import ChatInput from '@/ChatInput';
import { Fragment, useRef, useState } from 'react';
import { LLMMessage } from '../../../langchain';
import ModelDescription from '@/ModelDescription';
import { LLMModel } from '@/lib/types';

type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}

const placeholderModel: LLMModel = {
    name: 'Placeholder Model',
    description: 'This is a placeholder model for the chat page',
    image: 'https://via.placeholder.com/150',
    creator: 'Shadcn'
}
export default function ChatPage(){
    // todo fetch previous messages from backend
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    
    function sendMessage(){
    
    }
    return(
        <div className="grid grid-rows-[1fr,auto]">
            
            {/*show description when no messages*/}
            {messages.length === 0 && <ModelDescription {...placeholderModel}/>}
            
            {/*else show messages*/}
            {messages.length > 0 && <div className="px-2 grid gap-2 w-full overflow-y-scroll">
                {messages.map((message, key) => {
                    return (
                        <Fragment key={key}>
                            {message.chatBubble}
                        </Fragment>
                    );
                })}
            </div>}
            
            <ChatInput inputRef={inputRef} onSend={sendMessage}/>
        
        </div>
    )
}