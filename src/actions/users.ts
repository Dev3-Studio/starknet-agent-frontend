'use server';

import { ErrorResponse, get, post } from '@/actions/fetchApi';
import { User, UserCreate, zUser } from '@/lib/dto';

const path = 'users';

export async function getUser(address: string): Promise<User | ErrorResponse> {
    const res = await get(`${path}/${address}`);
    if (!res.ok) return await res.json();
    return zUser.parse(await res.json());
}

export async function createUser(user: UserCreate): Promise<User | ErrorResponse> {
    const res = await post(path, user);
    if (!res.ok) return await res.json();
    return zUser.parse(await res.json());
}