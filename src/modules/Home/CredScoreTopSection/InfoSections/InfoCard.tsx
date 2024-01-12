import { PropsWithChildren, ReactNode } from "react";

import { Card } from "@/common/components/Card";

interface Props {
  headingText: ReactNode;
  className?: string;
}

const InfoCard = ({ headingText, children }: PropsWithChildren<Props>) => {
  return (
    <Card>
      <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase opacity-60">
        {headingText}
      </h2>
      {children}
    </Card>
  );
};

export default InfoCard;
