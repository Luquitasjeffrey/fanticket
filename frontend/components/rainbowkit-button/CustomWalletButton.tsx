import { ConnectButton } from '@rainbow-me/rainbowkit';

export const CustomWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button 
                    onClick={openConnectModal} 
                    className="bg-red-primary hover:bg-red-hover text-main-white hover:cursor-pointer font-semibold py-2 px-4 rounded-lg text-18 w-full transition-all"
                  >
                    Connect Your Wallet
                  </button>
                );
              }

              // State 2: Wrong Network -> Show "Wrong Network" button
              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal} 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Wrong Network
                  </button>
                );
              }

              // State 3: Connected -> Show Balance & Address
              return (
                <div className="flex gap-3">
                  <button
                    onClick={openChainModal}
                    className="flex items-center bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-lg"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button 
                    onClick={openAccountModal} 
                    className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-lg"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};