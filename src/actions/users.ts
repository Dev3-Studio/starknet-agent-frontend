'use server';

import { ErrorResponse, get, post } from '@/actions/fetchApi';
import { User, UserCreate } from '@/lib/dto';

const path = '/users';

export async function getUser(address: string): Promise<User | ErrorResponse> {
    return await get(`${path}/${address}`);
}

export async function createUser(user: UserCreate): Promise<User | ErrorResponse> {
    return await post(path, user);
}