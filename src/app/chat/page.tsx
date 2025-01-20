'use client';
import ChatInput from '@/ChatInput';
import { Fragment, useRef, useState } from 'react';
import { LLMMessage } from '../../../langchain';

type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}

export default function ChatPage(){
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    
    function sendMessage(){
    
    }
    return(
        <div className="grid grid-rows-[1fr,auto]">
            
            
            <div className="px-2 grid gap-2 w-full overflow-y-scroll">
                {messages.map((message, key) => {
                    return (
                        <Fragment key={key}>
                            {message.chatBubble}
                        </Fragment>
                    );
                })}
            </div>
            
            <ChatInput inputRef={inputRef} onSend={sendMessage}/>
        
        </div>
    )
}