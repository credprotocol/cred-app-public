import { Placement } from "@popperjs/core";
import classNames from "classnames";
import React, {
  cloneElement,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePopper } from "react-popper";

import Portal from "@/common/components/Portal";
import useOutsideClick from "@/common/hooks/useClickOutside";

import { PopoverContext } from "./PopoverContext";

const getArrowPositionClassName = (currentArrowPosition: string) => {
  if (currentArrowPosition.includes("top")) {
    return "bottom-0 before:border-t-0 before:border-l-0";
  }
  if (currentArrowPosition.includes("bottom")) {
    return "top-0 before:border-b-0 before:border-r-0";
  }
  if (currentArrowPosition.includes("left")) {
    return "right-0 before:border-b-0 before:border-l-0";
  }
  if (currentArrowPosition.includes("right")) {
    return "left-0 before:border-t-0 before:border-r-0";
  }
};

const Trigger = ({ children, allowHover = false }) => {
  const { setIsOpen, setReferenceElement, props } = useContext(PopoverContext);
  if (!React.Children.only(children))
    console.error("Popover.Trigger only allows 1 child");
  const hoverEvents = {
    onMouseOver: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
  };
  return cloneElement(children, {
    ...(props as {}),
    ...(allowHover ? hoverEvents : {}),
    onClick: (e) => {
      setIsOpen((prev) => !prev);
    },
    ref: setReferenceElement,
  });
};

interface ContentProps extends ComponentPropsWithoutRef<"div"> {
  // referenceElement: HTMLElement
  arrowClassName?: string;
}
const Content = ({ children, ...rest }: PropsWithChildren<ContentProps>) => {
  if (!React.Children.only(children))
    console.error("Popover.Content only allows 1 child");

  const { isOpen, setIsOpen } = useContext(PopoverContext);

  const { referenceElement, placement, hasArrow } = useContext(PopoverContext);

  const [currentArrowPosition, setCurrentArrowPosition] = useState(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    // close on click outside of the

    placement: placement,
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, hasArrow ? 12 : 4],
        },
      },
    ],
  });

  useEffect(() => {
    if (attributes.popper) {
      setCurrentArrowPosition(attributes.popper["data-popper-placement"]);
    }
  }, [attributes.popper]);

  const popOverRef = useRef(null);

  useOutsideClick(
    popOverRef,
    () => {
      isOpen && setIsOpen(false);
    },
    referenceElement
  );

  return (
    <Portal elementId="pop-over">
      <div ref={popOverRef}>
        {/* Show/hide the tooltip based on context isOpen state */}
        {isOpen && (
          <div
            ref={setPopperElement}
            className={classNames(
              "absolute p-3 max-w-fit bg-cred-dark-blue border-2 border-cred-light-blue-opacity-0.2 text-white shadow-lg rounded-lg text-sm",
              rest.className ?? ""
            )}
            style={{ ...styles.popper }}
            {...attributes.popper}
          >
            {children}
            {hasArrow && (
              <div
                ref={setArrowElement}
                className={classNames(
                  `${
                    currentArrowPosition &&
                    getArrowPositionClassName(currentArrowPosition)
                  } before:transform before:rotate-45 before:border-2 before:border-cred-light-blue-opacity-0.2 before:bg-cred-dark-blue before:w-3 before:h-3 before:absolute before:top-0 before:left-0 before:-translate-y-2/4 before:-translate-x-2/4 before:z-[-1]`,
                  rest.arrowClassName ?? ""
                )}
                style={styles.arrow}
              ></div>
            )}
          </div>
        )}
      </div>
    </Portal>
  );
};

interface PopoverProps {
  placement?: Placement;
  hasArrow?: boolean;
  arrowClassName?: string;
}
const Popover = ({
  children,
  placement = "bottom",
  hasArrow = false,
  ...rest
}: PropsWithChildren<PopoverProps>) => {
  // Used internally to show/hide the tooltip
  const [isOpen, setIsOpen] = useState(false);

  // Will be used by react-popper to render the tooltip
  const [referenceElement, setReferenceElement] = useState<HTMLElement>(null);

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        referenceElement,
        setReferenceElement,
        placement,
        hasArrow,
        // When props are passed to <Popover>,
        // save it and add it to Popover.Trigger
        props: rest,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

Popover["Trigger"] = Trigger;
Popover["Content"] = Content;

export default Popover;
