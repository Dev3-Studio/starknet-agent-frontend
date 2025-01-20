'use client';

import React from 'react';
import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"


const ChatInput = (props: { inputRef: React.RefObject<HTMLInputElement>, onSend: () => void }) => {
    // send on enter
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            props.onSend();
        }
    }
    
    return (
        <div className="flex w-full mb-1 p-4 mx-auto max-w-[80rem] rounded-2xl bg-primary">
            {/*<SpeechInput inputRef={props.inputRef}/>*/}
            <Input
                className="mx-1 text-white" type="text" placeholder="Ask a Question..." ref={props.inputRef}
                onKeyDown={handleKeyDown}/>
            <Button onClick={props.onSend}>
                <SendHorizontal/>
            </Button>
        </div>
    
    );
};
export default ChatInput;