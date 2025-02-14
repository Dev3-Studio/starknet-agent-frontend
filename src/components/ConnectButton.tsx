'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Connector, useAccount, useConnect } from '@starknet-react/core';
import useMediaQuery from '@/hooks/use-media-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import Image, { StaticImageData } from 'next/image';
import loginImage from '@/public/loginImage.png';
import argent from '@/public/wallet-providers/argent.png';
import bravos from '@/public/wallet-providers/braavos.webp';
import { useToast } from '@/ui/use-toast';
import checkAddressDeployed from '@/actions/checkAddressDeployed';
import { useState } from 'react';

type Provider = {
    id: string;
    name: string;
    icon: StaticImageData;
};

const providers: Provider[] = [
    {
        id: 'argentX',
        name: 'Argent X',
        icon: argent,
    },
    {
        id: 'argentWebWallet',
        name: 'Argent Web Wallet',
        icon: argent,
    },
    {
        id: 'argentMobile',
        name: 'Argent Mobile',
        icon: argent,
    },
    {
        id: 'braavos',
        name: 'Braavos',
        icon: bravos,
    },
] as const;

export default function ConnectButton() {
    const [open, setOpen] = useState(false);
    
    function handleClick() {
        setOpen(true);
    }
    
    return (
        <div>
            <Button className="py-8 px-10 mt-3 text-2xl" onClick={handleClick}>
                Connect Wallet
            </Button>
            <ProviderSelectDialog open={open} setOpen={setOpen} />
        </div>
    );
}

function ProviderSelectDialog({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { connect, connectors } = useConnect();
    const { address } = useAccount();
    const { toast } = useToast();
    
    const getConnectorById = (id: string) =>
        connectors.find((connector) => connector.id === id);
    
    async function handleConnect(connector: Connector) {
        await connect({ connector }); // Await the connect function
        if (!address) return;
        
        setOpen(false);
        const isDeployed = await checkAddressDeployed(address);
        
        if (!isDeployed) {
            return toast({
                title: 'Address not deployed',
                description: 'Deploy your address by performing a transaction',
                variant: 'destructive',
            });
        }
        
        toast({
            title: 'Successfully connected',
            description: 'You have successfully connected your wallet',
        });
    }
    
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-primary max-h-[40rem] max-w-[80vw] w-fit">
                    <div className="flex p-2">
                        <div className="pr-8 w-[20rem]">
                            <Image
                                className="h-auto w-auto rounded-2xl"
                                src={loginImage}
                                alt="Login Image"
                            />
                        </div>
                        <div className="border border-white rounded-2xl bg-gradient-to-b from-white to-primary py-8 px-16">
                            <h2 className="text-center text-primary text-2xl drop-shadow font-bold">
                                Connect Wallet
                            </h2>
                            <div className="flex flex-col gap-4 pt-4 justify-center h-full -mt-8">
                                {providers.map((provider, index) => {
                                    const connector = getConnectorById(provider.id);
                                    return (
                                        <Button
                                            className="px-2 w-full"
                                            key={index}
                                            onClick={() => handleConnect(connector!)}
                                        >
                                            <div className="w-6 h-auto mr-2 ml-1">
                                                <Image
                                                    className="object-contain"
                                                    src={provider.icon}
                                                    alt={provider.name}
                                                />
                                            </div>
                                            <p className="w-full text-center">{provider.name}</p>
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-gradient-to-t from-white to-primary px-8">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-center">Connect Wallet</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 mb-8">
                    {providers.map((provider, index) => {
                        const connector = getConnectorById(provider.id);
                        return (
                            <Button
                                className="w-full mx-auto ring ring-ring px-2"
                                key={index}
                                onClick={() => handleConnect(connector!)}
                            >
                                <div className="w-6 h-auto mr-2">
                                    <Image
                                        className="object-contain"
                                        src={provider.icon}
                                        alt={provider.name}
                                    />
                                </div>
                                <p className="w-full text-center">{provider.name}</p>
                            </Button>
                        );
                    })}
                </div>
                <DrawerFooter className="pt-2 pb-8">
                    <DrawerClose asChild>
                        <Button>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}