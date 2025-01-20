'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// todo implement search functionality
export default function SearchBar() {
    return (
        <span className="pl-2 flex bg-accent rounded-3xl ">
            <Search className="my-auto text-primary"/>
            <Input className="border-none focus-visible:ring-0 text-black" placeholder="Search"/>
            
        </span>
    )
}