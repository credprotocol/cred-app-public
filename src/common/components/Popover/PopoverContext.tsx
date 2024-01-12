import { Placement } from "@popperjs/core";
import React, { SetStateAction } from "react";

export interface PopoverContextType<T extends unknown> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  referenceElement: HTMLElement;
  setReferenceElement: React.Dispatch<SetStateAction<HTMLElement>>;
  props: T;
  handleClose?: React.Dispatch<SetStateAction<boolean>>;
  placement?: Placement;
  hasArrow?: boolean;
}

export const PopoverContext = React.createContext<PopoverContextType<unknown>>(
  {} as PopoverContextType<unknown>
);
