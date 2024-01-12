import Highcharts, {
  Options,
  PointMouseOverCallbackFunction,
  SeriesMouseOutCallbackFunction,
} from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import Sunburst from "highcharts/modules/sunburst";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useMemo, useState } from "react";

import { HandCursorIcon } from "@/common/components/CustomIcon";
import { ReportAssetResult } from "@/types/api";

import { generateChartData, generateChartOptions } from "./helpers";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  Sunburst(Highcharts);
}
type LevelData = {
  name: string;
  id: string;
  custom: {
    value?: number;
    percent?: number;
  };
};

const HoverInfo = ({ data }) => {
  const name = data.name === "asset" ? "total assets" : data.name;
  const displayValue =
    data.slideValue.type === "percent"
      ? `${data.slideValue.value}%`
      : `$${data.slideValue.value}`;
  return (
    <div>
      <p className="text-5xl font-bold">{displayValue}</p>
      <p className="text-sm leading-[18px] mt-4 capitalize">{name}</p>
    </div>
  );
};
type SunburstChartProps = {
  assetData: ReportAssetResult;
  metric: string;
};

const renderFilter = ({ msg }: { msg?: string }) => {
  return (
    <div className="relative my-20">
      <img alt="circle" src={"/image/sunburst_no_data.svg"} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-8 text-xl opacity-60 text-center">
        {msg ? <span className="text-lg">{msg}</span> : "Not enough data"}
      </div>
    </div>
  );
};
export const SunburstChart = ({ assetData, metric }: SunburstChartProps) => {
  const [isShowHoverData, setShowHoverData] = useState(false);
  const [slideName, setSlideName] = useState("");
  const [slideValue, setSlideValue] = useState<{
    type: string;
    value: number;
  }>();

  const onMouseOut: SeriesMouseOutCallbackFunction = useCallback(() => {
    setShowHoverData(false);
  }, []);

  const onMouseOverPoint: PointMouseOverCallbackFunction = useCallback(
    (event) => {
      const data = event.target as unknown as LevelData;
      if (data.id !== "root") {
        setShowHoverData(true);
        setSlideName(data.name);
        const _slideValue =
          data.custom.value !== undefined
            ? { type: "value", value: data.custom.value }
            : { type: "percent", value: data.custom.percent };
        setSlideValue(_slideValue);
      } else {
        setShowHoverData(false);
      }
    },
    []
  );
  const data = useMemo(
    () => generateChartData(assetData, metric),
    [metric, assetData]
  );

  const options: Options = useMemo(
    () =>
      generateChartOptions({
        mouseOver: onMouseOverPoint,
        mouseOut: onMouseOut,
        data,
      }),
    [data, onMouseOut, onMouseOverPoint]
  );

  if (!data) {
    return renderFilter({});
  }

  const isTotalNull = data.some(
    (item) => item.id === "total" && item.value === null
  );

  if (isTotalNull) {
    return renderFilter({});
  }

  const hasNegative = data.some((slice) => slice.value < 0);

  if (hasNegative) {
    return renderFilter({
      msg: "Data Visual not available. Total Assets only show positive values.",
    });
  }

  return (
    <div className="relative flex justify-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3  w-[180px] text-center pointer-events-none">
        {!isShowHoverData ? (
          <>
            <div className="flex justify-center opacity-60">
              <HandCursorIcon />
            </div>
            <span>Hover regions to surface allocation</span>
          </>
        ) : (
          <HoverInfo data={{ name: slideName, slideValue }} />
        )}
      </div>
    </div>
  );
};
