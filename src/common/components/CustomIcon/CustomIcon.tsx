import { PropsWithChildren } from "react";

import ChevronDownSvg from "./svg/ChevronDown";
import ChevronLeftSvg from "./svg/ChevronLeft";
import ChevronRightSvg from "./svg/ChevronRight";
import CrossSvg from "./svg/Cross";
import DiamondSvg from "./svg/Diamond";
import { HandCursor } from "./svg/HandCursor";
import { InfoCircle } from "./svg/InfoCircle";
import LogoSvg from "./svg/Logo";
import MenuSvg from "./svg/Menu";
import MetaMaskSvg from "./svg/MetaMask";
import StarSvg from "./svg/Star";
import WalletConnectSvg from "./svg/WalletConnect";

interface Props extends React.SVGAttributes<SVGElement> {
  size?: number | string; // width and height will both be set as the same value
  name?: string;
}

const CustomIcon = (props: PropsWithChildren<Props>): JSX.Element => {
  const {
    children,
    width = 24,
    height = 24,
    size,
    viewBox = "0 0 24 24",
    name,
    ...rest
  } = props;

  return (
    <svg
      aria-labelledby={name}
      height={size || height}
      role="presentation"
      viewBox={viewBox}
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export const CrossIcon = ({ ...props }: Props) => (
  <CustomIcon height={24} viewBox="0 0 24 24" width={24} {...props}>
    <CrossSvg />
  </CustomIcon>
);

export const LogoIcon = ({ ...props }: Props) => (
  <CustomIcon height={48} viewBox="0 0 91 48" width={91} {...props}>
    <LogoSvg />
  </CustomIcon>
);

export const ChevronDownIcon = ({ ...props }: Props) => (
  <CustomIcon
    height={20}
    stroke="#335EEB"
    viewBox="0 0 20 20"
    width={20}
    {...props}
  >
    <ChevronDownSvg />
  </CustomIcon>
);

export const StarIcon = ({ ...props }: Props) => (
  <CustomIcon fill="none" height={42} viewBox="0 0 42 42" width={42} {...props}>
    <StarSvg />
  </CustomIcon>
);

export const ChevronRightIcon = ({ ...props }: Props) => (
  <CustomIcon fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
    <ChevronRightSvg />
  </CustomIcon>
);

export const ChevronLeftIcon = ({ ...props }: Props) => (
  <CustomIcon fill="none" height={10} viewBox="0 0 6 10" width={6} {...props}>
    <ChevronLeftSvg />
  </CustomIcon>
);

export const DiamondIcon = ({ ...props }: Props) => (
  <CustomIcon fill="none" height={18} viewBox="0 0 13 18" width={13} {...props}>
    <DiamondSvg />
  </CustomIcon>
);

export const MetaMaskIcon = ({ ...props }: Props) => (
  <CustomIcon fill="none" height={45} viewBox="0 0 48 45" width={48} {...props}>
    <MetaMaskSvg />
  </CustomIcon>
);

export const WalletConnectIcon = ({ ...props }: Props) => (
  <CustomIcon height={48} viewBox="0 0 48 48" width={48} {...props}>
    <WalletConnectSvg />
  </CustomIcon>
);

export const MenuIcon = ({ ...props }: Props) => (
  <CustomIcon height={16} viewBox="0 0 16 16" width={16} {...props}>
    <MenuSvg />
  </CustomIcon>
);
export const HandCursorIcon = ({ ...props }: Props) => (
  <CustomIcon height={16} viewBox="0 0 16 16" width={16} {...props}>
    <HandCursor />
  </CustomIcon>
);
export const InfoCircleIcon = ({ ...props }: Props) => (
  <CustomIcon
    fill="white"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    {...props}
  >
    <InfoCircle />
  </CustomIcon>
);
export default CustomIcon;
