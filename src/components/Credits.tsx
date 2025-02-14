"use client";
import IconCoin from '@/public/iconCoin.svg';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/actions/users';
import { useAccount, useSendTransaction } from '@starknet-react/core';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Credits() {
    
    const router = useRouter();
    // fetch user info
    const session = useSession();
    const [numCredits, setNumCredits] = useState(0);
    
    const user = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await getUser(session.data?.user.address!);
            if ('error' in res) return;
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
    
    if (!session.data) {
        return <p>Loading...</p>;
    }
    
    if (user.isLoading) return <p>Loading...</p>;
    
    if (user.data && 'error' in user.data) {
        router.push('/?error=unauthorized');
        return null;
    }
    
    
    // const tx = useSendTransaction();
    
    async function buyCredits() {
    
    
    
    }
    
    
    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-4xl mb-8">Tokens</h1>
            
            {/*box*/}
            <div className="flex flex-col items-center justify-center rounded-xl p-4 xl:py-8 xl:px-10 max-w-[45rem] w-full">
                <div className='flex justify-center w-full pr-2 pb-4'>
                    <p className='font-mono ml-2 text-2xl mr-2'>Your balance: </p>
                    <div className="my-auto">
                        <IconCoin alt='Coin Icon'/>
                    </div>
                    <p className='font-mono ml-2 text-2xl'>{user.data && user.data.credits}</p>
                </div>
                
                {/*amount*/}
                <div className='flex justify-between bg-muted rounded-2xl p-2 xl:px-6 py-5 my-2 w-full max-w-80'>
                    <Input value={numCredits} className='text-white focus-visible:-none focus-visible:ring-0 text-2xl w-full border-none' defaultValue={500} onChange={(e) => setNumCredits(parseInt(e.target.value))}/>
                    
                    <div className="my-auto mr-2">
                        <IconCoin alt='Coin Icon'/>
                    </div>
                </div>
                
                <Button className='py-8 px-10 mt-3 text-2xl' onClick={buyCredits}>Buy Credits</Button>
            </div>
        </div>
    )
}