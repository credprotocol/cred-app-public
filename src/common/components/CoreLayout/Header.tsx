import classNames from "classnames";
import { compareAsc } from "date-fns";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";

import { Button } from "@/common/components/Button";
import MobileMenu from "@/common/components/CoreLayout/MobileMenu";
import WalletPopover from "@/common/components/CoreLayout/WalletPopover";
import { ChevronDownIcon, LogoIcon } from "@/common/components/CustomIcon";
import Popover from "@/common/components/Popover/Popover";
import { AppContext } from "@/common/context/app.context";
import { shortenWalletAddress } from "@/common/utils/string";

interface Props {
  className?: string;
  openWalletModal: () => void;
  hideNavItems?: boolean;
}

export interface LinkType {
  label: string;
  link: string;
  action?: () => void;
  isExternal?: boolean;
}

const createLink = ({ onClickCredMonitor }) => [
  {
    label: "API",
    link: "https://beta.credprotocol.com/docs/api",
  },
  {
    label: "FAQs",
    link: "https://docs.credprotocol.com/",
  },
  {
    label: "Monitor your Score",
    link: "#",
    action: onClickCredMonitor,
  },
];

const Header = ({ className, openWalletModal, hideNavItems }: Props) => {
  const { address } = useAccount();
  const { openModal } = useContext(AppContext);
  const { disconnect } = useDisconnect();

  const [openMenu, setOpenMenu] = useState(false);

  const LINKS = createLink({ onClickCredMonitor: () => openModal("subcribe") });

  useEffect(() => {
    if (!address) {
      localStorage.removeItem("authToken");
    } else {
      const authToken = JSON.parse(localStorage.getItem("authToken") || null);
      if (authToken) {
        if (compareAsc(new Date(), new Date(authToken.expiredAt)) > 0) {
          toast.error("Token expired, please reconnect", {
            id: "expired-error",
          });
          setTimeout(() => disconnect(), 1000);
        }
      } else {
        setTimeout(() => disconnect(), 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={classNames(
        className,
        openMenu ? "bg-cred-dark-blue md:bg-transparent" : "bg-transparent",
        "flex h-[42px] transition-colors duration-[600ms] items-center justify-between px-6 pl-5 py-4 md:px-12 md:py-5"
      )}
    >
      <div>
        <LogoIcon className="h-[40px] md:h-[48px] w-[75.4px] md:w-[90.48px]" />
      </div>
      {hideNavItems ? null : (
        <nav className="flex items-center gap-8">
          <ul className="items-center hidden gap-8 text-base leading-5 text-white md:flex">
            {LINKS.map(({ link, label, action }) => {
              return (
                <li key={label} className="cursor-pointer" onClick={action}>
                  <a
                    href={action ? null : link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            {address ? (
              <Popover placement="bottom-end">
                <Popover.Trigger>
                  <Button
                    className={classNames(
                      "text-sm font-semibold md:flex",
                      openMenu && "hidden"
                    )}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    {shortenWalletAddress({ walletAddress: address })}
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <WalletPopover />
                </Popover.Content>
              </Popover>
            ) : (
              <Button
                className={classNames(
                  "text-sm font-semibold md:flex",
                  openMenu && "hidden"
                )}
                variant="outline"
                onClick={openWalletModal}
              >
                CONNECT WALLET
              </Button>
            )}
            <MobileMenu
              links={LINKS}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
