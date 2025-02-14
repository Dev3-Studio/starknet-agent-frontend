import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getAgents, GetAgentsOptions } from '@/actions/agents';
import { getChats, GetChatsOptions } from '@/actions/chats';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatAddress(address?: string) {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function fetchAgentsOrReturnEmpty(options: GetAgentsOptions) {
  const agents = await getAgents(options);
  if ('error' in agents) return [];
  return agents;
}

export async function fetchChatsOrReturnEmpty(options: GetChatsOptions) {
    const chats = await getChats(options);
    if ('error' in chats) return [];
    return chats;
}