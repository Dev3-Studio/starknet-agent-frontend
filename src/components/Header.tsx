"use client";
import WalletConnectButton from '@/components/WalletConnectButton';
import Logo from '@/public/logo.svg'
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Header(){
    const router = useRouter()
    const { status } = useSession();
    
    return(
        <header className="p-4 flex justify-between w-full max-w-custom mx-auto">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <Logo/>
            </div>
            
            <div className="flex gap-4">
                {status === 'authenticated' && <Button onClick={() => router.push('/user')}><User/></Button>}
                <WalletConnectButton />
                
            </div>
        </header>
    )
}