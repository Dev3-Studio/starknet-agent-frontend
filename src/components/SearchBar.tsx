"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/actions/agents';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

export default function SearchBar() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [debouncedQuery] = useDebounce(query, 200);
    
    const { data } = useQuery({
        queryKey: ['searchAgents', debouncedQuery],
        queryFn: async () => {
            const res = await getAgents({ searchQuery: debouncedQuery });
            if ('error' in res) return [];
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
    
    function handleClick(id: string) {
        router.push(`/chat/?agentId=${id}`);
    }
    
    return (
        <div className="relative w-full">
            <span className="pl-2 flex bg-muted w-full rounded-md">
                <Search className="my-auto text-primary"/>
                <Input
                    className="border-none focus-visible:ring-0"
                    placeholder="Search AI agents"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />
            </span>
            
            {isOpen && data && data.length > 0 && (
                <Card className="absolute mt-2 w-full max-h-96 overflow-y-auto z-50 p-2 shadow-lg">
                    <div className="space-y-2">
                        {data.map((agent) => (
                            <div
                                key={agent.id}
                                className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                                onClick={() => handleClick(agent.id)}
                            >
                                <div className="h-12 w-12 relative rounded-full overflow-hidden">
                                    <Image
                                        src={agent.image}
                                        alt={agent.name}
                                        width={1000}
                                        height={1000}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-sm">{agent.name}</h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                {agent.tagline}
                                            </p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            ${(agent.pricePerTokenUsd / 100).toFixed(2)}/token
                                        </div>
                                    </div>
                                    <div className="mt-1 flex gap-1 flex-wrap">
                                        {agent.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-muted rounded-full text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}