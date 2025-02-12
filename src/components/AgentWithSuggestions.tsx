import { AgentCardProps } from '@/AgentCard';
import { Heart, MessageSquare } from 'lucide-react';
import { Button } from '@/ui/button';

export default function AgentWithSuggestions(props: AgentCardProps){
    
    return(
        <div className="rounded-2xl border-accent border-2 py-10 px-10 w-[30rem] min-w-[30rem]">
            
            <div className="flex w-fit mx-auto">
                <img className="w-20 rounded-2xl" src="https://placehold.co/150" alt="Agent" />
                <div className="my-auto ml-4">
                    <h3>Ai Agent Name</h3>
                    <div className="flex gap-2 text-muted-foreground">
                        <p>By @Usercreator</p>
                        <div className="flex">
                            <MessageSquare />
                            2.5m
                        </div>
                        <div className="flex">
                            <Heart />
                            6.380
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-fit mx-auto mt-4 flex flex-col gap-1 ">
                <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
                <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
                <Button className="font-light" variant="outline">Lorem ipsum dolor sit amet consectetur?</Button>
            </div>
        </div>
    )
}