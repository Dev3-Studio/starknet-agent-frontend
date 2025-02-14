import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { cn } from '@/lib/utils';

export default function AgentIcon({ src, name, active }: { src?: string, name: string, active: boolean }) {
    // limit to 2 initials
    const getInitials = (name: string) => {
        const words = name.split(' ');
        return words.map(word => word[0]).slice(0, 2).join('');
    }
    
    return(
        <Avatar className={cn(
            "hover:ring-4 ring-primary cursor-pointer w-full aspect-square h-fit",
            active && "ring-4"
        )}>
            <AvatarImage src={src}/>
            {/*first character of every word*/}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
    )
}