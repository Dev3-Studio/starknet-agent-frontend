'use server';

import { ErrorResponse, get, post } from '@/actions/fetchApi';
import { Agent, AgentCreate, AgentPublic, zAgent, zAgentPublic } from '@/lib/dto';

const path = 'agents';

export async function getAgent(id: string): Promise<Agent | AgentPublic | ErrorResponse> {
    const res = await get(`${path}/${id}`);
    if (!res.ok) return await res.json();
    try {
        return zAgent.parse(await res.json());
    } catch {
        zAgentPublic.parse(await res.json());
    }
    return { error: 'Failed to parse agent' };
}

export interface GetAgentsOptions {
    tags?: string[];
    limit?: number;
    creator?: string;
    sort?: 'chats' | 'messages' | 'date';
    order?: string;
    searchQuery?: string;
}
export async function getAgents(options: GetAgentsOptions): Promise<AgentPublic[] | ErrorResponse> {
    const searchParams: string[][] = [];
    Object.entries(options).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            searchParams.push([key, ...value]);
        } else if (value) {
            searchParams.push([key, value]);
        }
    });
    const res = await get(path, searchParams);
    if (!res.ok) return await res.json();
    return zAgentPublic.array().parse(await res.json());
}

export async function createAgent(agent: AgentCreate): Promise<Agent | ErrorResponse> {
    const res = await post(path, agent);
    if (!res.ok) return await res.json();
    return zAgent.parse(await res.json());
}

export async function updateAgent(id: string, agent: AgentCreate): Promise<Agent | ErrorResponse> {
    const res = await post(`${path}/${id}`, agent);
    if (!res.ok) return await res.json();
    return zAgent.parse(await res.json());
}

