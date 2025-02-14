'use client';

import React from 'react';
import { SendHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const ChatInput = (props: { inputRef: React.RefObject<HTMLInputElement>, disabled?: boolean, onSend: (message: string) => void }) => {
    // send on enter
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            const value = props.inputRef.current?.value ?? '';
            if (!value) return;
            props.onSend(value);
            // Clear the input
            props.inputRef.current!.value = '';
        }
    }
    
    // send on click
    function handleClick() {
        const value = props.inputRef.current?.value ?? '';
        if (!value) return;
        props.onSend(value);
        // Clear the input
        props.inputRef.current!.value = '';
    }
    
    return (
        <div className="flex mb-1 pb-4 mx-auto w-full max-w-screen-md rounded-2xl">
            {/*<SpeechInput inputRef={props.inputRef}/>*/}
            <Input
                className="focus-visible:ring-primary bg-accent rounded-l-2xl"
                type="text"
                placeholder="Message..."
                ref={props.inputRef}
                disabled={props.disabled}
                onKeyDown={handleKeyDown}
            />
            <Button
                onClick={handleClick} variant="secondary"
                className="rounded-r-2xl aspect-square w-auto">
                <SendHorizontal/>
            </Button>
        </div>
    
    );
};
export default ChatInput;