// auth.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { RpcProvider } from 'starknet';
import { getMessageTypedData } from '@/lib/getMessageTypedData';


export const authConfig = {
    providers: [
        CredentialsProvider({
            id: "starknet",
            name: "StarkNet Wallet",
            credentials: {
                address: { label: "Address", type: "text" },
                signature: { label: "Signature", type: "text" },
            },
            async authorize(credentials, req) {
                if (!credentials?.address) {
                    return null;
                }
                
                const message = await getCsrfToken({ req });
                if (!message) return null;
                
                
                const data = getMessageTypedData(message);
                
                const isValid = await new RpcProvider().verifyMessageInStarknet(
                    data,
                    JSON.parse(credentials.signature),
                    credentials.address,
                )
                
                if (!isValid) {
                    return null;
                }
                
                return {
                    id: credentials.address,
                    address: credentials.address
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.address = token.sub as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.address = user.address;
            }
            return token;
        }
    },
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthOptions;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);