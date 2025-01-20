'use server';
import { z } from 'zod';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { tool } from '@langchain/core/tools';


const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    throw new Error('GOOGLE_API_KEY is not set');
}


// Options:
// gemini-2.0-flash-exp
// gemini-1.5-flash
// gemini-1.5-flash-8b
// gemini-1.5-pro
const LLM_MODEL = 'gemini-1.5-flash';

const llm = new ChatGoogleGenerativeAI(
    {
        apiKey: API_KEY,
        model: LLM_MODEL,
    },
);

// requires paid api to use
// const searchRetrievalTool: GoogleSearchRetrievalTool = {
//     googleSearchRetrieval: {
//         dynamicRetrievalConfig: {
//             mode: DynamicRetrievalMode.MODE_DYNAMIC,
//             dynamicThreshold: 0.7, // default is 0.7
//         },
//     },
// };
// const searchRetrievalModel = new ChatGoogleGenerativeAI({
//     model: "gemini-1.5-pro",
//     temperature: 0,
//     maxRetries: 0,
// }).bindTools([searchRetrievalTool]);


const placeholderSchema = z.object({
    operation: z.string().describe('The operation to perform'),
});

const placeholderTool = tool(
    () => undefined,
    {
        name: 'placeholderTool',
        description: 'A placeholder tool',
        schema: placeholderSchema,
    },
);


// const tokenSearchTool = tool(
//     () => undefined,
//     {
//         name: 'tokenSearchTool',
//         description: 'A tool that searches for information about a token',
//         schema: z.object({
//             query: z.string().describe('The input query to search for'),
//         }),
//     }
//
// )

// todo create system prompt
const systemPrompt = new SystemMessage(``);
const tools = [placeholderTool];
const modelWithTools = llm.bind({
    tools: tools,
});

export type LLMMessage = (AIMessage | HumanMessage);

export async function runTradeAI(messages: LLMMessage[]) {
    const result = await modelWithTools.invoke([systemPrompt, ...messages]);
    return { content: result.content, tool_calls: result.tool_calls };
}