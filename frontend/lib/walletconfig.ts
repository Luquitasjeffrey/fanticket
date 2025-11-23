import { injected, walletConnect } from "wagmi/connectors";
import { hardhat} from "viem/chains";
import { defineChain } from "viem";
import {type Address} from "viem";
import { createConfig, http, getAccount, getWalletClient, connect } from "@wagmi/core";

//export const network = hardhat;

export const network = /*#__PURE__*/ defineChain({
  id: 88882,
  name: 'Chiliz testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Chiliz',
    symbol: 'CHZ',
  },
  rpcUrls: {
    default: { http: ['https://spicy-rpc.chiliz.com'] },
  },
})

export const PROJECT_ID = '9a4bc6797a2a24b87ee07c4090024bab';

export const config = createConfig({
  chains: [network],
  transports: {
    [network.id]: http("http://127.0.0.1:8545")
  },
  connectors: [
    injected(), // metamask, brave, etc
    walletConnect({ projectId: PROJECT_ID, showQrModal: true }),
  ],
});

//export const FAN_TOKEN_ADDRESS = '0x67d269191c92caf3cd7723f116c85e6e9bf55933';
//export const FAN_TICKET_ADDRESS: Address =
//  "0xe6e340d132b5f46d1e472debcd681b2abc16e57e"; // poné tu contrato

export async function getConnectedWallet() {
  let acc = getAccount(config);

  // Si NO hay una wallet conectada → intentamos conectar automáticamente
  if (!acc.isConnected) {
    try {
      // 1. Intentar Metamask/brave/coinbase inyectada
      await connect(config, {
        connector: injected(),
      });
    } catch {
      // 2. Si no hay injected → abrir WalletConnect QR modal
      await connect(config, {
        connector: walletConnect({
          projectId: PROJECT_ID,
          showQrModal: true,
        }),
      });
    }

    // Luego de conectar, refrescamos el account
    acc = getAccount(config);
  }

  // Si todavía no está conectado → error real
  if (!acc.isConnected) {
    throw new Error("No se pudo conectar a ninguna wallet.");
  }

  const wallet = await getWalletClient(config);

  if (!wallet) {
    throw new Error("Error al obtener wallet client conectado.");
  }

  wallet.addChain({
    chain: network
  });

  return wallet;
}