'use client';
// dialogAtom.ts
import { atom } from 'jotai';
export const dialogOpenAtom = atom<{open: boolean, redirect?:string}>({ open: false });

import * as React from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { Connector, useAccount } from '@starknet-react/core';
import { useSession, signOut, getCsrfToken, signIn } from 'next-auth/react';
import useMediaQuery from '@/hooks/use-media-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useConnect, useSignTypedData } from '@starknet-react/core';
import Image, { StaticImageData } from 'next/image';
import loginImage from '@/public/loginImage.png';
import argent from '@/public/wallet-providers/argent.png';
import bravos from '@/public/wallet-providers/braavos.webp';
import { useToast } from '@/ui/use-toast';
import checkAddressDeployed from '@/actions/checkAddressDeployed';
import { getMessageTypedData } from '@/lib/getMessageTypedData';
import { stark } from 'starknet';
import formatCSRF from '@/lib/formatCSRF';


type Provider = {
    id: string
    name: string
    icon: StaticImageData
}

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

export default function WalletConnectButton() {
    const [isOpen, setIsOpen] = useAtom(dialogOpenAtom);
    const { status } = useSession();
    const { isConnected } = useAccount();
    
    function handleClick() {
        if (status === 'authenticated') {
            signOut({ redirect: false }).catch();
        } else {
            signOut({ redirect: false }).catch();
            setIsOpen({ open: true });
        }
    }
    
    return (
        <div>
            <Button
                className="text-foreground"
                onClick={handleClick}
            >
                {status === 'authenticated' ? 'Log Out' : 'Connect Wallet'}
            </Button>
            <ProviderSelectDialog open={isOpen.open} setOpen={()=> {
                // if we are logging out, redirect to home else no redirect
                const redirect = status === "authenticated" ? '/' : undefined;
                setIsOpen({ open: true, redirect });
            }} />
        </div>
    );
}


export function ProviderSelectDialog({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { connect, connectors } = useConnect();
    const { address } = useAccount();
    const { signTypedDataAsync } = useSignTypedData({});
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useAtom(dialogOpenAtom);
    
    const getConnectorById = (id: string) => connectors.find(connector => connector.id === id);
    
    async function handleConnect(connector: Connector) {
        connect({ connector });
        if (!address) return;
        setOpen(false);
        const isDeployed = await checkAddressDeployed(address);
        if (!isDeployed) {
            return toast({
                title: 'Address not deployed',
                description: 'Deploy your address by performing a transaction',
                variant: 'destructive'
            });
        }
        
        const token = await getCsrfToken();
        if (!token) return;
        const typedData = getMessageTypedData(formatCSRF(token));
        const signature = await signTypedDataAsync(typedData);
        const res = await signIn('starknet', {
            signature: JSON.stringify(stark.formatSignature(signature)),
            address, redirect: !(isOpen.redirect === undefined), callbackUrl: isOpen.redirect,
        });
        
        if (res && res.ok) toast({
            title: 'Successfully connected',
            description: 'You have successfully connected your wallet',
        });
        
        if (res && res.error) toast({
            title: 'Failed to connect',
            description: 'Failed to connect your wallet',
            variant: 'destructive'
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
                                            <p className="w-full text-center">
                                                {provider.name}
                                            </p>
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
            <DrawerContent className="bg-gradient-to-t from-white to-primary px-16">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-center">Connect Wallet</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 mb-8">
                    {providers.map((provider, index) => {
                        const connector = getConnectorById(provider.id);
                        return (
                            <Button
                                className="w-[20rem] mx-auto ring ring-ring px-2"
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
                                <p className="w-full text-center">
                                    {provider.name}
                                </p>
                            </Button>
                        );
                    })}
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}