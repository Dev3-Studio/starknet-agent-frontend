"use client";
import AgentCard from '@/AgentCard';
import HorizontalScroll from '@/HorizontalScroll';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function AgentCategoryFilter() {
    
    return(
        <div className="">
            <HorizontalScroll>
                <ToggleGroup type="single" className="p-1">
                    <ToggleGroupItem value="a">Virtual Assistance</ToggleGroupItem>
                    <ToggleGroupItem value="b">Design & Creative</ToggleGroupItem>
                    <ToggleGroupItem value="c">Digital Maketing</ToggleGroupItem>
                </ToggleGroup>
            </HorizontalScroll>
            
            {/*todo filter agents by the selected category */}
            <HorizontalScroll>
                <AgentCard name="" creator="" description="" image=""/>
            </HorizontalScroll>
        </div>
    )
}