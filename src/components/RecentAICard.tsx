import { Card } from '@/ui/card';
import { LLMModel } from '@/lib/types';

export default function RecentAICard({name, image,creator, tagline}: LLMModel){
    return(
        <Card className="flex p-3 min-w-[15rem]">
            <img src={image} alt={name} className="aspect-square w-[4.5rem] h-fit my-auto rounded-2xl"/>
            
            <div className="ml-3">
                <h3 className="text-sm">{name}</h3>
                <p className="text-muted-foreground text-xs">By @{creator}</p>
                <p className="text-muted-foreground text-xs">{tagline}</p>
            </div>
        </Card>
    )
}