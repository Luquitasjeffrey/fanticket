// @ts-nocheck
"use client";

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import * as fanticket from "@/lib/fanticket";
import * as utils from "@/lib/utils";
import * as walletconfig from "@/lib/walletconfig";
import { config } from '../config/wagmi';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.fanticket = fanticket;
      window.utils = utils;
      window.walletconfig = walletconfig;
      console.log("Globals exposed: window.fanticket, window.utils, etc.");
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}