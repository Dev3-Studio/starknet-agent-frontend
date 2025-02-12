// hooks/useStarkNetAuth.ts
'use client';

import { useConnect, Connector } from "@starknet-react/core";
import { useAccount } from "@starknet-react/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

export function useStarkNetAuth() {
    const { connect, connectors } = useConnect();
    const { address } = useAccount();
    const { data: session, status } = useSession();
    
    const handleConnect = useCallback(
        async (connector: Connector) => {
            try {
                await connect({ connector });
                
                if (address) {
                    const result = await signIn("starknet", {
                        address,
                        redirect: false,
                    });
                    
                    if (result?.error) {
                        throw new Error(result.error);
                    }
                }
            } catch (error) {
                console.error("Connection error:", error);
                throw error;
            }
        },
        [connect, address]
    );
    
    const handleDisconnect = useCallback(async () => {
        try {
            await signOut({ redirect: false });
        } catch (error) {
            console.error("Disconnect error:", error);
            throw error;
        }
    }, []);
    
    return {
        connect: handleConnect,
        disconnect: handleDisconnect,
        isConnected: status === "authenticated",
        isLoading: status === "loading",
        address: session?.user?.address,
        connectors,
    };
}