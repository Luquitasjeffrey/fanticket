import { injected, walletConnect } from "@wagmi/connectors";
import { hardhat} from "viem/chains";
import {type Address} from "viem";
import { createConfig, http, getAccount, getWalletClient, connect } from "@wagmi/core";

export const network = hardhat;

export const PROJECT_ID = '9a4bc6797a2a24b87ee07c4090024bab';

export const config = createConfig({
  chains: [network],
  transports: {
    [network.id]: http()
  },
  connectors: [
    injected(), // metamask, brave, etc
    walletConnect({ projectId: PROJECT_ID, showQrModal: true }),
  ],
});

export const FAN_TICKET_ADDRESS: Address =
  "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"; // poné tu contrato

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

  return wallet;
}