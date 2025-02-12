'use client';
import ChatInput from '@/ChatInput';
import { Fragment, useRef, useState } from 'react';
import { LLMMessage } from '../../../../langchain';
import ModelDescription from '@/ModelDescription';
import { LLMModel } from '@/lib/types';

type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}


export default function UserPage(){
    // todo fetch previous messages from backend
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    
    function sendMessage(){
    
    }
    return(
        <div className="grid grid-rows-[1fr,auto]">
        
        
        
        </div>
    )
}