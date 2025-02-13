"use client";

import { Button } from '@/ui/button';
import { useSession } from 'next-auth/react';

export default function RedirectButton(){
    const { status } = useSession();
    
    function handleRedirect(){
        if (status === 'authenticated') {
            window.location.href = "/forge";
        } else {
            window.location.href = "/api/auth/signin";
        }
    }
    
    return(
        <Button onClick={handleRedirect} className="px-16 font-light rounded-xl">Forge your agent</Button>
    )
}