"use client";
import AgentCard from '@/AgentCard';
import HorizontalScroll from '@/HorizontalScroll';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import SearchBar from './SearchBar';
import { UserIcon } from 'lucide-react';

const categories = ["Virtual Assistant", "Design and Creativty", "Digital Marketing", "Customer Service", "Finance and Accounting", "Human Resources", "Legal", "Healthcare", "Real Estate", "Education", "Software Development", "Data Science", "Product Management", "Project Management", "Business Development", "Operations", "Other"]

export default function AgentCategoryFilter() {

    return (
        <div className="flex flex-col gap-4 pt-4">
            <div className=''>
                <HorizontalScroll>
                    <ToggleGroup type="single" className="p-1 w-full overflow-hidden">
                        {categories.map((category, index) => (
                            <ToggleGroupItem value={category} key={index} className='text-nowrap'>{category}</ToggleGroupItem>
                        )).slice(0, 2)}
                        {/* slicing for sizing perhaps only displays options corresponding with cards? */}
                    </ToggleGroup>
                </HorizontalScroll>
            </div>

            {/*todo filter agents by the selected category */}
            <HorizontalScroll>
                <AgentCard name="" creator="" description="" image="" />
            </HorizontalScroll>
        </div>
    )
}