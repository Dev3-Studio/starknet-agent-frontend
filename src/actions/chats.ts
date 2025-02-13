'use server';

import { del, ErrorResponse, get, post } from '@/actions/fetchApi';
import { Chat, ChatCreate } from '@/lib/dto';

const path = '/chats';

export async function getChat(id: string): Promise<Chat | ErrorResponse> {
    return await get(`${path}/${id}`);
}

export async function createChat(chat: ChatCreate): Promise<Chat | ErrorResponse> {
    return await post(path, chat);
}

export async function sendMessage(id: string, message: string): Promise<Chat | ErrorResponse> {
    return await post(`${path}/${id}/messages`, { message });
}

export async function deleteChat(id: string): Promise<boolean> {
    return await del(`${path}/${id}`);
}