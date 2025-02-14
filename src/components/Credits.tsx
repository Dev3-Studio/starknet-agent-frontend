"use client";
import IconCoin from '@/public/iconCoin.svg';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/actions/users';
import { useAccount } from '@starknet-react/core';
import { useRouter } from 'next/navigation';

export default function Credits() {
    
    const router = useRouter();
    // fetch user info
    const { address } = useAccount();
    const user = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await getUser(address!);
            if ('error' in res) return;
            return res;
        },
        staleTime: 1000 * 60 * 5,
    });
    
    if (user.isLoading) return <p>Loading...</p>;
    
    if (user.data && 'error' in user.data) {
        router.push('/?error=unauthorized');
        return null;
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
                <div className='flex justify-between bg-muted rounded-2xl w-full p-2 xl:px-6 py-5 my-2'>
                    <Input className='text-white focus-visible:-none focus-visible:ring-0 text-2xl w-2/5 border-none' defaultValue={500} />
                    
                    <div className="my-auto mr-2">
                        <IconCoin alt='Coin Icon'/>
                    </div>
                </div>
                
                {/*network and fees*/}
                {/*<div className='flex justify-between rounded-3xl w-full px-4 p-2 xl:px-8 xl:py-3 mb-5'>*/}
                {/*    <p className='text-white font-regular text-center'>Est total fees: $2.96</p>*/}
                
                {/*</div>*/}
                
                <Button className='py-8 px-10 mt-3 text-2xl'>Buy Credits</Button>
            </div>
        </div>
    )
}