"use client";
import WalletConnectButton from '@/components/WalletConnectButton';
import Logo from '@/public/logo.svg'
import { useRouter } from 'next/navigation';

export default function Header(){
    const router = useRouter()
    
    return(
        <header className="p-4 flex justify-between">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <Logo/>
            </div>
            
            <WalletConnectButton />
        </header>
    )
}