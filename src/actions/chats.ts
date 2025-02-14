'use server';

import { del, ErrorResponse, get, post } from '@/actions/fetchApi';
import { Chat, ChatCreate, zChat } from '@/lib/dto';

const path = 'chats';

export async function getChat(id: string): Promise<Chat | ErrorResponse> {
    const res = await get(`${path}/${id}`);
    if (!res.ok) return await res.json();
    return zChat.parse(await res.json());
}

export interface GetChatsOptions {
    order?: 'asc' | 'desc';
    agentId?: string;
    includeMessages?: boolean;
}
export async function getChats(options: GetChatsOptions): Promise<Chat[] | ErrorResponse> {
    const res = await get(path, { ...options, includeMessages: options.includeMessages ? 'true' : 'false' });
    if (!res.ok) return await res.json();
    return zChat.array().parse(await res.json());
}

export async function createChat(chat: ChatCreate): Promise<Chat | ErrorResponse> {
    const res = await post(path, chat);
    if (!res.ok) return await res.json();
    return zChat.parse(await res.json());
}

export async function sendMessage(id: string, message: string): Promise<Chat | ErrorResponse> {
    const res = await post(`${path}/${id}/messages`, { message });
    if (!res.ok) return await res.json();
    return zChat.parse(await res.json());
}

export async function deleteChat(id: string): Promise<boolean> {
    const res = await del(`${path}/${id}`);
    return res.ok;
}