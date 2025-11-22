//@ts-ignore
import { createWalletClient, custom } from 'viem'

async function createClient() {
  if (!window.ethereum) {
    throw new Error("No hay wallet instalada");
  }

  const client = createWalletClient({
    transport: custom(window.ethereum)
  });

  return client;
}

const client = await createClient();

function currentUserIsAdmin() {

}