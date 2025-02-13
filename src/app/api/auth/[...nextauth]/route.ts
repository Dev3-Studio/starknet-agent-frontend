import "next-auth";
import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth';

declare module "next-auth" {
    interface Session {
        user: {
            address: string;
        };
    }
    interface User {
        address: string;
    }
}


const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };