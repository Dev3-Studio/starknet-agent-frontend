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
        <div className="flex mb-1 p-4 mx-auto w-full max-w-[60rem] rounded-2xl">
            {/*<SpeechInput inputRef={props.inputRef}/>*/}
            <Input
                className="-mr-8 focus-visible:ring-primary bg-accent h-full rounded-2xl" type="text" placeholder="Message..." ref={props.inputRef}
                onKeyDown={handleKeyDown}/>
            <Button onClick={props.onSend} variant="secondary"
            className="rounded-2xl aspect-square h-full w-auto">
                <SendHorizontal/>
            </Button>
        </div>
    
    );
};
export default ChatInput;