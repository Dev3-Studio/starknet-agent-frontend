"use client";
import { Card } from '@/ui/card';
import Image from 'next/image';
import { MessageSquare, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgentCreate(){
    const router =  useRouter();
    
    function handleClick(){
        router.push('/forge-agent');
    }
    
    
    return (
        <Card className="w-60 h-72 rounded-3xl overflow-hidden cursor-pointer bg-muted flex flex-col justify-center text-center ring-2 ring-muted-foreground p-6 my-1" onClick={handleClick}>
            
            <Plus className="w-full h-full text-muted-foreground" />
            
            <p className="text-3xl">Create<br/>new agent</p>
        </Card>
    );
}