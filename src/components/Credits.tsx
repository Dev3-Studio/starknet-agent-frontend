"use client";
import IconCoin from '@/public/iconCoin.svg';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/actions/users';
import { useAccount, useContract, useSendTransaction } from '@starknet-react/core';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Provider } from 'starknet';
import { useToast } from '@/ui/use-toast';
import ConnectButton from '@/ConnectButton';

const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const starkAddress = process.env.NEXT_PUBLIC_STARK_CONTRACT as `0x${string}`;
const provider = new Provider({
    // @ts-ignore
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    nodeUrl: process.env.NEXT_PUBLIC_NODE_URL,
})

export default function Credits() {
    const { toast } = useToast();
    
    const router = useRouter();
    // fetch user info
    const session = useSession();
    const [numCredits, setNumCredits] = useState(0);
    const { account, isConnected } = useAccount();
    
    const abi = useQuery({
        queryKey: ['abi'],
        queryFn: async () => {
            const { abi } = await provider.getClassAt(address);
            if (!abi) {
                throw new Error('No ABI found for contract');
            }
            return abi;
        },
    });
    
    const starknetAbi = useQuery({
        queryKey: ['starkAbi'],
        queryFn: async () => {
            const { abi } = await provider.getClassAt(starkAddress);
            if (!abi) {
                throw new Error('No ABI found for contract');
            }
            return abi;
        },
    });
    
    const contract = useContract({
        address,
        abi: abi.data,
        provider: account,
    });
    
    const starkContract = useContract({
        address: starkAddress,
        abi: starknetAbi.data,
        provider: account,
    })
    
    
    const { error, sendAsync, data } = useSendTransaction({
        
        calls:
            contract.contract && starkContract.contract && address && numCredits
                ? [
                    // todo calculate quoted value
                    starkContract.contract.populate("approve", [contract.contract.address, (10000n * 10n ** 18n)]),
                    contract.contract.populate("credit", [BigInt(numCredits)]),
                ]
                : undefined,
    });
    
    
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
        return <p className="text-2xl text-center mx-auto">Loading...</p>;
    }
    
    if (user.isLoading) return <p >Loading...</p>;
    
    if (user.data && 'error' in user.data) {
        router.push('/?error=unauthorized');
        return null;
    }
    
    async function buyCredits() {
        
        if (!account) return;
        if (!numCredits || numCredits < 1) {
            toast({
                title: "Error buying credits",
                description: "You need to buy at least 1 credit",
                variant: 'destructive',
            });
        }
        if (!sendAsync) return;
        
        
        await sendAsync();
        
        if (error) {
            toast({
                title: "Error buying credits",
                description: error.message,
                variant: 'destructive',
            });
            return;
        } else {
            toast({
                title: "Credits bought",
                description: `You bought ${numCredits} credits`,
            });
        }
    }
    
    
    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className=" text-4xl mb-8">Tokens</h1>
            
            {/*box*/}
            <div className="flex flex-col items-center justify-center rounded-xl p-4 xl:py-8 xl:px-10 max-w-[45rem] w-full">
                <div className='flex justify-center w-full pr-2 pb-4'>
                    {isConnected && <><p className="font-mono ml-2 text-2xl mr-2">Your balance: </p>
                    <div className="my-auto">
                        <IconCoin alt='Coin Icon'/>
                    </div></>}
                    {user.data && <p className="font-mono ml-2 text-2xl">{user.data.credits}</p>}
                    {user.isLoading && <p className="text-2xl text-center mx-auto">Loading...</p>}
                </div>
                
                {/*amount*/}
                <div className='flex justify-between bg-muted rounded-2xl p-2 xl:px-6 py-5 my-2 w-full max-w-80'>
                    <Input value={numCredits} type="number" className='text-white focus-visible:-none focus-visible:ring-0 text-2xl w-full border-none' defaultValue={500} onChange={(e) => setNumCredits(parseInt(e.target.value))}/>
                    
                    <div className="my-auto mr-2">
                        <IconCoin alt='Coin Icon'/>
                    </div>
                </div>
                
                {isConnected && <Button className="py-8 px-10 mt-3 text-2xl" onClick={buyCredits}>Buy Credits</Button>}
                {!isConnected && <ConnectButton />}
            </div>
        </div>
    )
}