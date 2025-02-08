import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';

export default function AgentIcon({ src, name }: { src?: string, name: string, id: string }) {
    // limit to 2 initials
    const getInitials = (name: string) => {
        const words = name.split(' ');
        return words.map(word => word[0]).slice(0, 2).join('');
    }
    
    return(
        <Avatar className="hover:ring-4 ring-primary cursor-pointer w-full aspect-square h-fit">
            <AvatarImage src={src}/>
            {/*first character of every word*/}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
    )
}