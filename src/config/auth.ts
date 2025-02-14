import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { getMessageTypedData } from '@/lib/getMessageTypedData';
import formatCSRF from '@/lib/formatCSRF';
import { getProvider } from '@/actions/getProvider';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/actions/users';

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
                try {
                    if (!credentials?.address || !credentials?.signature) {
                        console.log('Missing credentials');
                        return null;
                    }
                    
                    // Get and validate CSRF token
                    const csrfToken = await getCsrfToken({ req: { headers: req.headers } });
                    if (!csrfToken) {
                        console.log('Missing CSRF token');
                        return null;
                    }
                    
                    // Format message and get typed data
                    const formatted = formatCSRF(csrfToken);
                    const messageData = getMessageTypedData(formatted);
                    
                    // Parse signature - add error handling
                    let parsedSignature;
                    try {
                        parsedSignature = JSON.parse(credentials.signature);
                    } catch (error) {
                        console.error('Failed to parse signature:', error);
                        return null;
                    }
                    
                    
                    // Verify the signature
                    const provider = await getProvider();
                    
                    const isValid = await provider.verifyMessageInStarknet(
                        messageData,
                        parsedSignature,
                        credentials.address,
                    );
                    
                    if (!isValid) {
                        console.log('Invalid signature');
                        return null;
                    }
                    
                    const newUser = await createUser({ walletAddress: credentials.address });
                    
                    return {
                        id: credentials.address,
                        address: credentials.address
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
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
        error: '/auth/error', // Add an error page
    },
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug logs in development
} satisfies NextAuthOptions;

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authConfig)
}

export const { handlers, signIn, signOut } = NextAuth(authConfig);