'use server';

import { Json } from '@/lib/dto';
import { getServerSession } from 'next-auth';
import jwt from 'jsonwebtoken';

function signJwt(address: string) {
    if (!process.env.NEXTAUTH_SECRET) {
        throw new Error('Make sure you set NEXTAUTH_SECRET in your environment variables');
    }
    return jwt.sign({ address }, process.env.NEXTAUTH_SECRET, { expiresIn: '1m' });
}

async function getAuthHeader() {
    const session = await getServerSession();
    if (session?.user.address) {
        return `Bearer ${signJwt(session.user.address)}`;
    }
    return '';
}

function getBaseUrl(): string {
    if (!process.env.API_URL) {
        throw new Error('Make sure you set API_URL in your environment variables');
    }
    return process.env.API_URL;
}

export type ErrorResponse = {
    error: string;
}

export async function get(path: string, params?: ConstructorParameters<typeof URLSearchParams>[0]) {
    const baseUrl = new URL(getBaseUrl());
    baseUrl.pathname = path;
    const searchParams = new URLSearchParams(params);
    return await fetch(`${baseUrl.toString()}?${searchParams.toString()}`, {
        headers: {
            'Authorization': await getAuthHeader(),
        }
    });
}

export async function post(path: string, body?: Json) {
    const baseUrl = new URL(getBaseUrl());
    baseUrl.pathname = path;
    return await fetch(baseUrl.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await getAuthHeader(),
        },
        body: JSON.stringify(body),
    });
}

export async function patch(path: string, body?: Json) {
    const baseUrl = new URL(getBaseUrl());
    baseUrl.pathname = path;
    return await fetch(baseUrl.toString(), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await getAuthHeader(),
        },
        body: JSON.stringify(body),
    });
}

export async function del(path: string) {
    const baseUrl = new URL(getBaseUrl());
    baseUrl.pathname = path;
    return await fetch(baseUrl.toString(), {
        method: 'DELETE',
        headers: {
            'Authorization': await getAuthHeader(),
        }
    });
}