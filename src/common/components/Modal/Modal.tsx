import classNames from "classnames";

import { CrossIcon } from "@/common/components/CustomIcon";
import Portal from "@/common/components/Portal";
import useDisableBodyScroll from "@/common/hooks/useDisableBodyScroll";
import useMountTransition from "@/common/hooks/useMountTransition";

interface Props {
  isMounted: boolean;
  setOpenModal: (isOpen: boolean) => void;
  wrapperAdditionalClassNames?: string;
  children: React.ReactNode;
  hasCloseButton?: boolean;
  noAnimation?: boolean;
  unmountDelay?: number;
  duration?: number;
}

export const Modal = ({
  isMounted,
  setOpenModal,
  wrapperAdditionalClassNames,
  hasCloseButton = true,
  children,
  noAnimation = false,
  unmountDelay = 350,
  duration,
}: Props) => {
  const hasTransitionedIn = useMountTransition(
    isMounted,
    noAnimation ? 0 : unmountDelay
  );

  useDisableBodyScroll(isMounted);

  return (
    <Portal elementId="modal">
      {(hasTransitionedIn || isMounted) && (
        <aside
          className={classNames(
            isMounted
              ? "bg-black/10 backdrop-blur-[14px] opacity-100"
              : "opacity-0",
            hasTransitionedIn
              ? "bg-black/10 backdrop-blur-[14px] opacity-100"
              : "opacity-0",
            noAnimation ? "" : "transition-opacity duration-[600ms]",
            "fixed inset-0 z-30 md:grid md:place-items-center md:px-5 overflow-y-auto lg:px-0"
          )}
          style={{
            transitionDuration: duration ? `${duration}ms` : "",
          }}
        >
          <div
            className="relative w-full md:max-w-[fit-content]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={classNames(
                "p-6 md:p-8 md:rounded-3xl text-white bg-cred-dark-blue shadow-lg md:my-4",
                wrapperAdditionalClassNames
              )}
            >
              {hasCloseButton && (
                <div className="flex items-center justify-end w-full">
                  <button
                    aria-label="Close"
                    className="mb-4"
                    onClick={() => setOpenModal(false)}
                  >
                    <CrossIcon className="w-6 h-6 text-white md:w-4 md:h-4" />
                    <span className="sr-only">Close Modal</span>
                  </button>
                </div>
              )}
              {children}
            </div>
          </div>
        </aside>
      )}
    </Portal>
  );
};

export default Modal;
