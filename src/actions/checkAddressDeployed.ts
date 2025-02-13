'use server';
import { Contract } from 'starknet';
import abi from '../abi/accountAbi.json'
import { getProvider } from '@/actions/getProvider';

// check if a starknet smart wallet is deployed at the given address
export default async function checkAddressDeployed(address: string){
    const provider = await getProvider();
    const contract = new Contract(abi, address, provider);
    try {
        await contract.call('get_owner')
        return true;
    } catch {
        return false;
    }
    
}