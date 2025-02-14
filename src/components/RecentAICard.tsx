"use client";
import { Card } from '@/ui/card';
import { Chat } from '@/lib/dto';
import { formatAddress } from '@/lib/utils';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

export default function RecentAICard({agent}: Chat){
    const router = useRouter();
    
    function handleClick(){
        router.push(`/chat/${agent.id}`);
    }
    
    return(
        <Card className="flex p-3 min-w-[15rem] cursor-pointer" onClick={handleClick}>
            <Image src={agent.image}
                   alt={agent.name}
                   className="aspect-square w-[4.5rem] h-fit my-auto rounded-2xl object-cover"
                   width={1000}
                   height={1000}
            />
            
            <div className="ml-3">
                <h3 className="text-sm">{agent.name}</h3>
                <p className="text-muted-foreground text-xs">By @{formatAddress(agent.creator.walletAddress)}</p>
                <p className="text-muted-foreground text-xs">{agent.tagline}</p>
            </div>
        </Card>
    )
}