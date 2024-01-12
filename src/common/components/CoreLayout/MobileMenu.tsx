import classNames from "classnames";
import Link from "next/link";

import { CrossIcon, MenuIcon } from "@/common/components/CustomIcon";
import useDisableBodyScroll from "@/common/hooks/useDisableBodyScroll";
import useMountTransition from "@/common/hooks/useMountTransition";

import { LinkType } from "./Header";

interface MobileMenuProps {
  openMenu: boolean;
  setOpenMenu: (isOpen: boolean) => void;
  links: LinkType[];
  noAnimation?: boolean;
}
// MobileMenu appearance is controlled by lg:hidden classNames on each of the containers
const MobileMenu = ({
  openMenu,
  setOpenMenu,
  links,
  noAnimation,
}: MobileMenuProps): JSX.Element => {
  useDisableBodyScroll(openMenu);

  const hasTransitionedIn = useMountTransition(openMenu, 1000);

  const MenuToggler = () => {
    return (
      <button
        aria-label="Toggle menu"
        className={classNames(
          "flex items-center justify-center text-white rounded md:hidden",
          openMenu ? "pr-2.5" : "bg-black p-3"
        )}
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <CrossIcon /> : <MenuIcon />}
      </button>
    );
  };

  const handleMenuClick = () => {
    setOpenMenu(false);
  };

  return (
    <>
      {(hasTransitionedIn || openMenu) && (
        <nav
          className={classNames(
            openMenu ? "bg-black opacity-100" : "opacity-0",
            hasTransitionedIn ? "bg-black opacity-100" : "opacity-0",
            noAnimation ? "" : "transition-opacity duration-[600ms]",
            "fixed text-white inset-0 z-[20] top-[71px] h-full w-full bg-cred-dark-blue md:hidden"
          )}
        >
          <ul className="flex flex-col mt-16 leading-4 gap-14">
            {links.map(({ link, label, isExternal, action }) => {
              let linkComponent;
              if (isExternal) {
                linkComponent = (
                  <a
                    className="block text-2xl text-center"
                    href={action ? null : link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                );
              } else {
                linkComponent = (
                  <Link href={action ? null : link}>
                    <a className="block text-2xl text-center">{label}</a>
                  </Link>
                );
              }
              return (
                <li key={label} onClick={handleMenuClick}>
                  {linkComponent}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <MenuToggler />
    </>
  );
};

export default MobileMenu;
