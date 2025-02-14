import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

export interface ModelDescriptionProps extends  React.HTMLProps<HTMLDivElement> {
    name: string;
    description: string;
    image: string;
}

export default function ModelDescription({ className, name, description, image }: ModelDescriptionProps) {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            <Image
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full object-cover"
                width={128}
                height={128}
            />
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>);
    
}