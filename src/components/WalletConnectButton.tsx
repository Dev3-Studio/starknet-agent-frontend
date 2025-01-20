'use client';

import * as React from "react"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import { useAccount, useConnect } from "@starknet-react/core"
export default function WalletConnectButton() {
    const [open, setOpen] = React.useState<boolean>(false)
    
    function handleClick(){
    
    }
    
    return (
        <div>
            <Button className="bg-amber-800" onClick={() => setOpen(true)}>Connect Wallet</Button>
            
            <ProviderSelectDialog open={open} setOpen={setOpen} />
        </div>
    );
}



export function ProviderSelectDialog({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const { connect, connectors } = useConnect()
    
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Connect Wallet</DialogTitle>
                    </DialogHeader>
                    {connectors.map((connector) => (
                        <button onClick={() => connect({ connector })}>
                            Connect {connector.id}
                        </button>
                    ))}
                </DialogContent>
            </Dialog>
        )
    }
    
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Connect Wallet</DrawerTitle>
                </DrawerHeader>
                {connectors.map((connector) => (
                    <button onClick={() => connect({ connector })}>
                        Connect {connector.id}
                    </button>
                ))}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


