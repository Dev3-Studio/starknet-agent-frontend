'use server'


import { RpcProvider } from 'starknet';

const provider = new RpcProvider({
    nodeUrl: process.env.ALCHEMY_URL,
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID as any,
});


export async function getProvider() {
    return provider;
}