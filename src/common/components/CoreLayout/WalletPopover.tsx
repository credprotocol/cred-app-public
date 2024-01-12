import classNames from "classnames";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

import { Button } from "@/common/components/Button";
import {
  MetaMaskIcon,
  WalletConnectIcon,
} from "@/common/components/CustomIcon";

const WalletPopover = () => {
  const { chain: activeChain } = useNetwork();
  const { connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();

  const COINBASE_ID = "coinbaseWallet";
  const METAMASK_ID = "metaMask";
  const WALLETCONNECT_ID = "walletConnect";

  const connectors = {
    [METAMASK_ID]: {
      icon: <MetaMaskIcon height={34} width={34} />,
      name: "MetaMask",
    },
    [COINBASE_ID]: {
      icon: (
        <img alt="coinbase" height={34} src="/image/coinbase.png" width={34} />
      ),
      name: "Coinbase",
    },
    [WALLETCONNECT_ID]: {
      icon: <WalletConnectIcon height={34} width={34} />,
      name: "Wallet Connect",
    },
  };

  const activeConnectorItem = connectors[activeConnector?.id];
  const disconnectWallet = () => {
    localStorage.removeItem("authToken");
    disconnect();
  };

  if (!activeConnectorItem) {
    return <></>;
  }

  return (
    <div className="min-w-[192px]">
      <div className="flex items-center gap-3 mb-4">
        {activeConnectorItem.icon}
        <div>
          <h2 className="text-base font-bold leading-5">
            {" "}
            {activeConnectorItem.name}
          </h2>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-cred-green" />
            <p className="text-[11px]">{activeChain.name}</p>
          </span>
        </div>
      </div>
      <Button
        className={classNames(
          "text-sm w-10/12 py-1.5 uppercase font-semibold md:flex"
        )}
        variant="primary"
        onClick={disconnectWallet}
      >
        Disconnect
      </Button>
    </div>
  );
};

export default WalletPopover;
