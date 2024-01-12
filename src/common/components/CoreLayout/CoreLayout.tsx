import { add } from "date-fns";
import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Header from "@/common/components/CoreLayout/Header";
import {
  APIDispatchContext,
  apiReducer,
  APIResultContext,
  initialAPIContextData,
} from "@/common/context/api.context";
import { AppContext } from "@/common/context/app.context";

import ConnectWalletModal from "./ConnectWallet/ConnectWalletModal";
import { SubcribeModal } from "./SubcribeModal";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const defaultChains = [mainnet, goerli];

// Configure chains & providers with the Alchemy provider.
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "cred-protocol",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        showQrModal: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

interface Props {
  hideNavItems?: boolean;
}

interface ModalProps {
  id: string;
  isMounted: boolean;
  setOpenModal: (isOpen: boolean) => void;
}
const renderModal = ({ id, isMounted, setOpenModal }: ModalProps) => {
  switch (id) {
    case "connect":
      return (
        <ConnectWalletModal isMounted={isMounted} setOpenModal={setOpenModal} />
      );
    case "subcribe":
      return (
        <SubcribeModal isMounted={isMounted} setOpenModal={setOpenModal} />
      );
  }
};
type AccessToken = {
  accessToken: string;
  expiredAt: Date;
};

export const CoreLayout = ({
  children,
  hideNavItems,
}: PropsWithChildren<Props>) => {
  // modal with list of wallet providers eg: metamask, coinbase & walletconnect
  const [isMounted, setIsMounted] = useState(false);
  const [modalId, setModalId] = useState("");
  const [authToken, setAuthToken] = useState<AccessToken>(null);
  const [data, dispatch] = useReducer<typeof apiReducer>(
    apiReducer,
    initialAPIContextData
  );

  const openModal = (id: string) => {
    setIsMounted(true);
    setModalId(id);
  };

  const closeModal = () => {
    setIsMounted(false);
    setModalId("");
  };

  const toggleModal = (id: string) => (isOpen: boolean) => {
    if (isOpen) {
      openModal(id);
    } else {
      closeModal();
    }
  };
  // --- Fixing Hydration failed error --- //
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
    const authToken = JSON.parse(localStorage.getItem("authToken")) || null;
    setAuthToken(authToken);
  }, []);

  if (isSSR) {
    return null;
  }

  const handleSetToken = (accessToken: string) => {
    const authToken = {
      accessToken,
      expiredAt: add(+new Date(), {
        days: 29,
      }),
    };
    localStorage.setItem("authToken", JSON.stringify(authToken));
    setAuthToken(authToken);
  };

  return (
    <>
      {/* // Passing client to React Context Provider */}
      <WagmiConfig client={client}>
        <AppContext.Provider
          value={{
            auth: authToken,
            setAuthToken: handleSetToken,
            isMounted,
            openModal,
            closeModal,
            modalId,
          }}
        >
          <APIResultContext.Provider value={{ ...data }}>
            <APIDispatchContext.Provider value={dispatch}>
              <div
                className="min-h-screen text-white"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(19, 24, 100, 0.2), rgba(19, 24, 100, 0.2)), #000338",
                }}
              >
                <div
                  className="relative min-h-screen"
                  style={{
                    backgroundSize: "1800px",
                    backgroundPosition: "top 20px center",
                    backgroundImage: "url('/image/DissolveBG.jpg')",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <Header
                    hideNavItems={hideNavItems}
                    openWalletModal={() => openModal("connect")}
                  />
                  {children}
                </div>

                {/* FOOTER */}
              </div>
              {renderModal({
                id: modalId,
                isMounted,
                setOpenModal: toggleModal(modalId),
              })}
            </APIDispatchContext.Provider>
          </APIResultContext.Provider>
        </AppContext.Provider>
      </WagmiConfig>
    </>
  );
};

export default CoreLayout;
