import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { Card } from "@/common/components/Card";
import ProgressBar from "@/common/components/StatisticProgressBar";
import { APIResultContext } from "@/common/context/api.context";

import { defaultStatisticData } from "../constant";
import { extractAddressAPIData } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";

const LoadingStatistic = () => {
  return (
    <Card className="grow md:w-1/2">
      <Skeleton width={87} />
      <div className="flex flex-col gap-y-6">
        {Array(4)
          .fill(4)
          .map((_, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <Skeleton width={150} />
                <Skeleton borderRadius={999} height={50} width={300} />
              </div>
            );
          })}
      </div>
    </Card>
  );
};

const ReportStatistic = () => {
  let statisticData = defaultStatisticData;
  const {
    reportAddress: { data, loading, error },
  } = useContext(APIResultContext);

  useEffect(() => {
    if (error) {
      toast.error("Error while fetching report statistic data", {
        id: "fetchError",
      });
    }
  }, [error]);
  if (loading) {
    return <LoadingStatistic />;
  }

  if (data) {
    statisticData = extractAddressAPIData(data);
  }

  // Filter collateral data if collateral is not present
  const filterStatisticData = statisticData?.filter(
    (item) =>
      item.metricName !== "collateral" ||
      (item.metricName === "collateral" &&
        item.value !== null &&
        item.percentile !== null)
  );

  return (
    <Card childWrapperClass="p-8 pb-9" className="grow md:w-1/2">
      <h2 className="font-bold text-xl leading-5 mb-9">
        Statistics
        <InfoWithTooltip>
          <div className="w-[209px] text-xs">
            {"Total Metric Value and Percentile of Account ($USD)"}
          </div>
        </InfoWithTooltip>
      </h2>
      {filterStatisticData.map((metric) => (
        <div
          key={metric.metricName}
          className="flex mb-10 last:mb-0 items-center"
        >
          <div className="leading-5 min-w-[130px]">{`Total ${metric.metricName}`}</div>
          <ProgressBar percentile={metric?.percentile} value={metric.value} />
        </div>
      ))}
    </Card>
  );
};

export default ReportStatistic;
