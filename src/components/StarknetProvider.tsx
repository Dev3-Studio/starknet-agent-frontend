'use client';
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from 'starknetkit/argentMobile';
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { SessionProvider } from 'next-auth/react';


export default function StarknetProvider({children} : {children: React.ReactNode}) {
    const chains = [mainnet]
    
    const connectors = isInArgentMobileAppBrowser() ? [
        ArgentMobileConnector.init({
            options: {
                url: "https://web.argent.xyz",
                dappName: "Example dapp",
                projectId: "example-project-id",
            },
            inAppBrowserOptions: {},
        })
    ] : [
        new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
        new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
        new WebWalletConnector({ url: "https://web.argent.xyz" }),
        ArgentMobileConnector.init({
            options: {
                url: "https://web.argent.xyz",
                dappName: "Example dapp",
                projectId: "example-project-id",
            }
        })
    ]
    
    return(
        <SessionProvider>
            <StarknetConfig
                chains={chains}
                provider={publicProvider()}
                connectors={connectors}
            >
                {children}
            </StarknetConfig>
        </SessionProvider>
    
    )
    
}