import "next-auth";

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

// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from '@/config/auth';

export const middleware = NextAuth(authConfig).auth;

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};