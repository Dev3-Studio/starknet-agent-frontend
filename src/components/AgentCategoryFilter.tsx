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
            <div className='place-content-end flex'>
                <div className='flex justify-between gap-4 items-center'>
                    {/* <input placeholder='Search for an agent service...' className='bg-transparent' /> */}
                    <SearchBar />
                    <UserIcon />
                </div>
            </div>
            <div className=''>
                <HorizontalScroll>
                    <ToggleGroup type="single" className="p-1 w-full overflow-hidden">
                        {categories.map((category, index) => (
                            <ToggleGroupItem value={category} key={index} className='text-nowrap'>{category}</ToggleGroupItem>
                        ))}
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