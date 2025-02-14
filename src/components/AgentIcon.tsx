"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AgentIcon({ src, name, active, id }: { src?: string, name: string, active: boolean, id: string }) {
    const router = useRouter();
    
    // limit to 2 initials
    const getInitials = (name: string) => {
        const words = name.split(' ');
        return words.map(word => word[0]).slice(0, 2).join('');
    }
    
    function handleClick() {
        router.push(`/chat/?agentId=${id}`);
    }
    
    
    return(
        <Avatar
            onClick={handleClick}
            className={cn(
            "hover:ring-4 ring-primary cursor-pointer w-full aspect-square h-fit",
            active && "ring-4"
        )}>
            <AvatarImage src={src}/>
            {/*first character of every word*/}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
    )
}