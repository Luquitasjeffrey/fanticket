import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Fanticket rainbowkit',
  projectId: '9a4bc6797a2a24b87ee07c4090024bab',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});