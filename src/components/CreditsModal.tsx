import IconCoin from "@/public/iconCoin.svg";
import { Button } from '@/ui/button';
import { Input } from "./ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Credits from '@/Credits';

export default function CreditsModal(){
    
    return(
        
        <Dialog>
            <DialogTrigger asChild>
                <Button>Buy Tokens</Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[min(45rem,60vw)] max-w-[90vw]">
                <Credits/>
            </DialogContent>
        </Dialog>
    )
}