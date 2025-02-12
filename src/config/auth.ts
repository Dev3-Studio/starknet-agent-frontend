// auth.ts
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from 'next-auth/react';
import { typedData, TypedDataRevision, constants, TypedData, hash, ec, stark } from 'starknet';


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
                
                
                const data: TypedData = {
                    domain: {
                        chainId: process.env.NEXT_PUBLIC_CHAIN_ID as string, // keep chainId dynamic
                        name: "AgentForge",
                        version: "1.0.0",
                    },
                    message: {
                        message,
                    },
                    primaryType: "Message",
                    types: {
                        Message: [
                            {
                                name: "message",
                                type: "string",
                            },
                        ],
                        StarkNetDomain: [
                            {
                                name: "name",
                                type: "felt",
                            },
                            {
                                name: "chainId",
                                type: "felt",
                            },
                            {
                                name: "version",
                                type: "felt",
                            },
                        ],
                    },
                }
                
                // todo get data in form bignumberish[]
                const msgHash = hash.computeHashOnElements(data);
                const isValid = ec.starkCurve.verify(credentials.signature, msgHash, credentials.address);
                
                
                
                
                return {
                    id: credentials.address,
                    address: credentials.address,
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