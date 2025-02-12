import { TypedData } from 'starknet';

export function getMessageTypedData(message: string): TypedData {
    return {
        domain: {
            chainId: process.env.NEXT_PUBLIC_CHAIN_ID as string, // keep chainId dynamic
            name: "AgentForge",
            version: "1.0.0",
        },
        message: {
            message,
        },
        primaryType: "Message",
        types: {
            Message: [
                {
                    name: "message",
                    type: "string",
                },
            ],
            StarkNetDomain: [
                {
                    name: "name",
                    type: "felt",
                },
                {
                    name: "chainId",
                    type: "felt",
                },
                {
                    name: "version",
                    type: "felt",
                },
            ],
        },
    }
}