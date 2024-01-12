import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "@/common/components/Card";
import { ComposeHistoryChart } from "@/common/components/ComposeHistoryChart";
import { getTailwindColor } from "@/styles/theme";
import { HistoryResultUSD } from "@/types/api";

import { metricConfigs } from "../constant";
import { generateMetricConfig } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";
import { generateHistoryData } from "./helpers";

const ReportHistorySkeleton = () => {
  return (
    <div className="flex justify-between flex-col md:flex-row mb-[30px] md:mb-6">
      <Skeleton width={200} />
      <div className="flex gap-y-4 md:h-[18px] flex-wrap md:flex-nowrap md:gap-3 lg:gap-6">
        {Array(4)
          .fill(1)
          .map((_, index) => {
            return (
              <div key={index} className="flex items-center justify-center">
                <Skeleton circle className="mx-2" height={10} width={10} />
                <Skeleton width={80} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export const ReportHistoryChart = ({
  data,
  loading,
}: {
  data: HistoryResultUSD;
  loading: boolean;
}) => {
  const memoData = useMemo(
    () => (!!data && data.length > 0 ? data : null),
    [data]
  );
  const chartData = generateHistoryData(memoData);
  const isCollateralPresent = chartData?.some(
    (item) => item.collateral !== null
  );
  const filteredMetricConfigs = isCollateralPresent
    ? metricConfigs
    : metricConfigs.filter(
        (metricConfig) => metricConfig.label.toLowerCase() !== "collateral"
      );
  const metrics = generateMetricConfig(filteredMetricConfigs);
  const reverseMetrics = metrics.map((i) => i).reverse();

  return (
    <Card className="h-[654px] md:h-[560px] pb-4">
      {loading ? (
        <ReportHistorySkeleton />
      ) : (
        <div className="flex justify-between flex-col md:flex-row mb-[30px] md:mb-6">
          <h2 className="text-xl leading-[18px] font-bold tracking-widest mb-6 md:mb-0">
            Your borrowing history
            <InfoWithTooltip>
              <div className="w-[209px] text-xs">
                <p>
                  Aggregated metrics of holding in the last 5 months ($USD).
                </p>
                <br />
                <p>
                  Months with missing dots indicate missing data for account.
                </p>
              </div>
            </InfoWithTooltip>
          </h2>
          <div className="flex gap-y-4 md:h-[18px] font-medium leading-[18px] tracking-widest flex-wrap md:flex-nowrap md:gap-3 lg:gap-6">
            {metrics.map(({ metricName, color, metricLabel }) => {
              return (
                <div
                  key={metricName}
                  className="leading-[18px] w-1/2 md:w-auto flex items-center"
                >
                  <span
                    className={`rounded-full w-3 h-3 inline-block`}
                    style={{
                      background: chartData
                        ? getTailwindColor(color)
                        : "#ffffff33",
                    }}
                  ></span>
                  <div className="ml-1 text-sm leading-[18px] inline-block whitespace-nowrap">
                    {chartData ? (
                      <span className="capitalize">{metricLabel}</span>
                    ) : (
                      <span className="text-white/60">{metricLabel}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <AutoSizer>
        {({ width, height }) => (
          <ComposeHistoryChart
            data={chartData}
            height={Math.min(height, 510)}
            metrics={reverseMetrics}
            width={width}
          />
        )}
      </AutoSizer>
    </Card>
  );
};
