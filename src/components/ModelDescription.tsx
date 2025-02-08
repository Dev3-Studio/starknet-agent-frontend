import { LLMModel } from '@/lib/types';

export default function ModelDescription({name, description, image}: LLMModel){
    return (
        <div className="flex flex-col items-center pt-10 mt-32">
            <img src={image} alt={name} className="w-8 h-8 rounded-full"/>
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>);
    
}