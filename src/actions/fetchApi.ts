'use server';

import { Json } from '@/lib/dto';
import { getServerSession } from 'next-auth';
import jwt from 'jsonwebtoken';

function signJwt(address: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error('Make sure you set JWT_SECRET in your environment variables');
    }
    return jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: '1m' });
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
    message: string;
}

export async function get(path: string, params?: ConstructorParameters<typeof URLSearchParams>[0]) {
    const baseUrl = new URL(`${getBaseUrl()}/${path}`);
    const searchParams = new URLSearchParams(params);
    const headers = new Headers();
    headers.append('Authorization', await getAuthHeader());
    const response = await fetch(`${baseUrl.toString()}?${searchParams.toString()}`, {
        headers,
    });
    return await response.json();
}

export async function post(path: string, body?: Json) {
    const baseUrl = new URL(`${getBaseUrl()}/${path}`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', await getAuthHeader());
    const response = await fetch(baseUrl.toString(), {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    return await response.json();
}

export async function patch(path: string, body?: Json) {
    const baseUrl = new URL(`${getBaseUrl()}/${path}`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', await getAuthHeader());
    const response = await fetch(baseUrl.toString(), {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
    });
    return await response.json();
}

export async function del(path: string) {
    const baseUrl = new URL(`${getBaseUrl()}/${path}`);
    const headers = new Headers();
    headers.append('Authorization', await getAuthHeader());
    const response = await fetch(baseUrl.toString(), {
        method: 'DELETE',
        headers,
    });
    return response.ok;
}