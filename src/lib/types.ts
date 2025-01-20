import { ZodSchema } from 'zod';

export interface LLMModel {
    name: string;
    description: string;
    image: string;
    creator: string;
}
