import { AgentCardProps } from '@/AgentCard';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/ui/button';
import { useRouter } from 'next/navigation';
import { AgentPublic } from '@/lib/dto';


const messageSuggestions = [
    "Lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet consectetur?",
    "Lorem ipsum dolor sit amet consectetur?",
]
export default function AgentWithSuggestions(props: AgentPublic){
    const router = useRouter();
    
    function handleClick(message: string) {
        router.push(`/chat/?agentId=${props.id}?message=${message}`);
    }
    
    return(
        <div className="rounded-2xl border-accent border-2 py-10 px-10 w-[30rem] min-w-[30rem] bg-muted">
            
            <div className="flex w-fit mx-auto">
                <img className="w-20 rounded-2xl" src="https://placehold.co/150" alt="Agent" />
                <div className="my-auto ml-4">
                    <h3>Ai Agent Name</h3>
                    <div className="flex gap-2 text-muted-foreground">
                        <p>By @Usercreator</p>
                        <div className="flex">
                            <MessageSquare className="size-4 my-auto mr-1" />
                            2.5m
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-fit mx-auto mt-4 flex flex-col gap-1 ">
                {
                    messageSuggestions.map((message, index) => (
                        <Button key={index} className="font-light" variant="outline" onClick={()=> handleClick(message)}>{message}</Button>
                    ))
                }
            </div>
        </div>
    )
}