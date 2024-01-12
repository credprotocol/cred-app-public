import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  elementId: string;
}

const Portal = ({ children, elementId }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }
  return createPortal(children, document.getElementById(elementId));
};

export default Portal;
