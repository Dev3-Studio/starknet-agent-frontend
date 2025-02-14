import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import Credits from '@/Credits';
import { Coins } from 'lucide-react';

export default function CreditsModal(){
    
    return(
        
        <Dialog>
            <DialogTrigger asChild>
                <Coins className="size-12 rounded-full bg-background text-yellow-400 border-yellow-400 border cursor-pointer p-2 " />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[min(45rem,60vw)] max-w-[90vw]">
                <Credits/>
            </DialogContent>
        </Dialog>
    )
}