'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/actions/agents';
import React, { useState } from 'react';

// todo implement search functionality
export default function SearchBar() {
    const [query, setQuery] = useState('');
    
    
    const results = useQuery({
        queryKey: ['searchAgents', query],
        queryFn: async () => {
            const res = await getAgents({ limit: 6, sort: 'chats', order: 'desc' });
            if ('error' in res) return [];
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
    

    
    return (
        <span className="pl-2 flex bg-muted w-full">
            <Search className="my-auto text-primary"/>
            <Input className="border-none focus-visible:ring-0" placeholder="Search AI agents" value={query}
                   onChange={(e) => setQuery(e.target.value)}/>
        </span>
    )
}