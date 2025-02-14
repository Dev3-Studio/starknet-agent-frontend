"use client";
import AgentCard from '@/AgentCard';
import HorizontalScroll from '@/HorizontalScroll';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { categories } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/actions/agents';
import { useState } from 'react';



export default function AgentCategoryFilter() {
    
    const [category, setCategory] = useState(categories[0]);
    
    const popularAgents = useQuery({
        queryKey: ['filteredAgents', category],
        queryFn: async () => {
            const res = await getAgents({ limit: 1, sort: 'chats', order: 'desc', tags: [category] });
            if ('error' in res) return [];
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        
        
        <div className="flex flex-col gap-4 pt-4 items-center">
            <HorizontalScroll>
                <div className=''>
                        <ToggleGroup type="single" className="p-1 w-full overflow-hidden" onValueChange={(v) => setCategory(v)} value={category}>
                            {categories.map((category, index) => (
                                <ToggleGroupItem value={category} key={index} className='text-nowrap'>{category}</ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                </div>
            </HorizontalScroll>

            {/*todo filter agents by the selected category */}
            <HorizontalScroll>
                {
                    !popularAgents.data || popularAgents.data.length === 0 && <p>No agents found</p>
                }
                
                {popularAgents.data && popularAgents.data.map((agent, index) => (
                    <AgentCard key={index} {...agent} />
                ))}
            </HorizontalScroll>
        </div>
        
        
    )
}