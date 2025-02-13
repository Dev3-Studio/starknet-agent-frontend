'use client';

import * as React from "react"
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
import { useAccount, useConnect } from "@starknet-react/core"
import Image from 'next/image';
import loginImage from '@/public/loginImage.png';

export default function WalletConnectButton() {
    const [open, setOpen] = React.useState<boolean>(false)
    
    function handleClick(){
        setOpen(true)
    }
    
    return (
        <div>
            <Button className="text-foreground" onClick={handleClick}>Connect Wallet</Button>
            
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
                <DialogContent className="!rounded-3xl bg-primary max-h-[40rem] max-w-[80vw] w-fit">
                    <div className="flex p-2">
                        
                        <div className="pr-8 w-[20rem]">
                            <Image className="h-auto w-auto rounded-2xl" src={loginImage} alt="Login Image"/>
                            
                        </div>
                        
                        <div className="border border-white rounded-2xl bg-gradient-to-b from-white to-primary py-8 px-16">
                            <div className="flex flex-col gap-4 justify-center h-full" >
                                
                                {connectors.map((connector, index) => (
                                    <Button key={index} onClick={() => connect({ connector })}>
                                        Connect {connector.id}
                                    </Button>
                                ))}
                            </div>
                            
                        </div>
                    </div>
                    
                </DialogContent>
            </Dialog>
        )
    }
    
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-gradient-to-t from-white to-primary px-16">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-center">Connect Wallet</DrawerTitle>
                </DrawerHeader>
                <div className=" flex flex-col gap-4 mb-8">
                    {connectors.map((connector, index) => (
                        <Button className="w-[20rem] mx-auto ring ring-ring" key={index} onClick={() => connect({ connector })}>
                            Connect {connector.id}
                        </Button>
                    ))}
                </div>
                
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}


