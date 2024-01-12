import { PropsWithChildren } from "react";

import { InfoCircleIcon } from "@/common/components/CustomIcon";
import Popover from "@/common/components/Popover/Popover";

export const InfoWithTooltip = ({ children }: PropsWithChildren) => {
  return (
    <Popover hasArrow placement="top">
      <Popover.Trigger>
        <span className="inline-block ml-2 cursor-pointer">
          <InfoCircleIcon fill="#9D9FB3" />
        </span>
      </Popover.Trigger>
      <Popover.Content
        arrowClassName="before:!bg-white"
        className="!bg-white !text-black"
      >
        {children}
      </Popover.Content>
    </Popover>
  );
};
