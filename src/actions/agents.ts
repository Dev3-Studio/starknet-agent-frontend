'use server';

import { ErrorResponse, get, post } from '@/actions/fetchApi';
import { Agent, AgentCreate, AgentPublic } from '@/lib/dto';

const path = '/agents';

export async function getAgent(id: string): Promise<Agent | AgentPublic | ErrorResponse> {
    return await get(`${path}/${id}`);
}

interface GetAgentsOptions {
    tags?: string[];
    limit?: number;
    creator?: string;
    sort?: 'chats' | 'messages' | 'date';
    order?: string;
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
    return await get(path, searchParams);
}

export async function createAgent(agent: AgentCreate): Promise<Agent | ErrorResponse> {
    return await post(path, agent);
}

export async function updateAgent(id: string, agent: AgentCreate): Promise<Agent | ErrorResponse> {
    return await post(`${path}/${id}`, agent);
}

