"use client";
import AgentCard from '@/AgentCard';
import HorizontalScroll from '@/HorizontalScroll';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { categories } from '@/lib/constants';



export default function AgentCategoryFilter() {

    return (
        <div className="flex flex-col gap-4 pt-4">
            <HorizontalScroll>
                <div className=''>
                        <ToggleGroup type="single" className="p-1 w-full overflow-hidden">
                            {categories.map((category, index) => (
                                <ToggleGroupItem value={category} key={index} className='text-nowrap'>{category}</ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                </div>
            </HorizontalScroll>

            {/*todo filter agents by the selected category */}
            <HorizontalScroll>
                <AgentCard name="" creator="" description="" image="" />
            </HorizontalScroll>
        </div>
    )
}