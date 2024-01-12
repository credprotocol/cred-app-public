import { PropsWithChildren } from "react";

import Popover from "../Popover/Popover";

interface StatisticProgressBarTooltipProps {
  percentile: string;
}

export const StatisticProgressBarTooltip = ({
  percentile,
  children,
}: PropsWithChildren<StatisticProgressBarTooltipProps>) => (
  <Popover hasArrow placement="top">
    <Popover.Trigger allowHover>{children}</Popover.Trigger>
    <Popover.Content
      arrowClassName="before:!bg-white"
      className="!bg-white !text-black"
    >
      <span className="text-xs text-cred-gray.700">{`${percentile}th %ile`}</span>
    </Popover.Content>
  </Popover>
);
