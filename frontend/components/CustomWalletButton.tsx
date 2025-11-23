// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { getConnectedWallet } from '@/lib/walletconfig';

export const CustomWalletButton = () => {
  const [wallet, setWallet] = useState<any | null>(null);

  const handleConnect = async () => {
    try {
      const w = await getConnectedWallet();
      setWallet(w);
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    // Si necesitás algo extra, lo agregás vos
  };

  // Si NO está conectada → botón de conectar
  if (!wallet) {
    return (
      <button
        onClick={handleConnect}
        className="bg-red-primary hover:bg-red-hover text-main-white hover:cursor-pointer font-semibold py-2 px-4 rounded-lg text-18 w-full transition-all"
      >
        Connect Your Wallet
      </button>
    );
  }

  let addressTxt;
  if (wallet) {
    window.address = wallet.account.address;
    addressTxt = `${wallet.account.address.slice(0, 6)}...${wallet.account.address.slice(-4)}`
  } else {
    addressTxt = 'Unknown';
  }

  // Si está conectada → mostrar dirección + desconectar
  return (
    <div className="flex gap-3 items-center">
      <span className="bg-gray-100 text-black py-2 px-4 rounded-lg font-semibold">
        {addressTxt}
      </span>

      <button
        onClick={handleDisconnect}
        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg font-semibold"
      >
        Disconnect
      </button>
    </div>
  );
};
