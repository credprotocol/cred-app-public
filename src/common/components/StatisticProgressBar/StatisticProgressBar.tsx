import classNames from "classnames";

import { getTailwindColor } from "@/styles/theme";

import { StatisticProgressBarTooltip } from "./StatisticProgressBarTooltip";

type Props = {
  value: number;
  background?: string;
  className?: string;
  percentile: string;
};
const getProgressColor = (value: number) => {
  if (value >= 90) {
    return getTailwindColor("green-chart");
  } else if (value >= 70) {
    return getTailwindColor("orange");
  } else if (value >= 40) {
    return getTailwindColor("yellow");
  }
  return getTailwindColor("pink");
};

const ProgressBar = ({ value, background, className, percentile }: Props) => {
  if (!value) {
    return (
      <div className="w-full h-7 rounded-full relative bg-cred-dark-purple pl-4 pt-2 text-xs text-[#A8AECD]">
        No data
      </div>
    );
  }

  if (value < 0) {
    return (
      <div className="w-full h-7 rounded-full relative bg-cred-dark-purple pl-2 text-cred-pink">
        <span className="font-bold">{value.toLocaleString()}</span>
        <span className="text-xs">{`--th %ile`}</span>
      </div>
    );
  }

  return (
    <div
      className={classNames("w-full h-7 rounded-full relative", className)}
      style={{
        backgroundColor: background || getTailwindColor("dark-purple"),
      }}
    >
      <StatisticProgressBarTooltip percentile={percentile}>
        <div
          className="h-7 rounded-full pl-2 flex items-center"
          style={{
            width: `${percentile}%`,
            backgroundColor: getProgressColor(+percentile),
          }}
        >
          <span
            className={classNames("font-bold", {
              "text-black": value > 50,
            })}
          >
            {value.toLocaleString()}
          </span>
        </div>
      </StatisticProgressBarTooltip>
    </div>
  );
};

export default ProgressBar;
