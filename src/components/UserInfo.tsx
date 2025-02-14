'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { getUser } from '@/actions/users';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function UserInfo() {
    const router = useRouter();
    const session = useSession();
    const { data: user } = useQuery({
        queryKey: ['getUser', session.data?.user.address],
        queryFn: async () => {
            const res = await getUser(session.data?.user.address ?? '');
            if ('error' in res) {
                throw new Error(res.error);
            }
            return res;
        }
    });
    const credits = user?.credits ?? 0;
    let walletAddress = 'None';
    if (session.data?.user.address) {
        const address = session.data.user.address;
        walletAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    
    return(
        <div className="bg-primary flex px-4 h-20" >
            <Avatar className="my-auto cursor-pointer" onClick={() => router.push('/account')} >
                <AvatarImage src={`https://api.dicebear.com/9.x/shapes/svg?seed=${session.data?.user.address}`} />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            
            <div className="ml-4 my-auto">
                <p className="text-wrap line-clamp-1">
                    {walletAddress}
                </p>
                <p className="text-gray-400 -mt-1">
                    Credits: {credits}
                </p>
            </div>
        </div>
    )
}