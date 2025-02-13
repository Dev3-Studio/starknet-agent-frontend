"use client";

import { Button } from '@/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { dialogOpenAtom } from '@/WalletConnectButton';
import { useAtom } from 'jotai/index';

export default function RedirectButton(){
    const router =  useRouter();
    const { status } = useSession();
    
    const [, setIsOpen] = useAtom(dialogOpenAtom);
    
    function handleRedirect(){
        if (status === 'authenticated') {
            router.push('/forge-agent');
        } else {
            setIsOpen(true);
        }
    }
    
    return(
        <Button onClick={handleRedirect} className="px-16 font-light rounded-xl">Forge your agent</Button>
    )
}