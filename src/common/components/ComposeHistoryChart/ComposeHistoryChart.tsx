import { isEmpty } from "lodash";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthMapping } from "@/constant/reportData";

export interface DataType {
  [key: string]: number | string;
}
type ChartData = {
  date: string;
  debt: number;
  deposit: number;
  collateral: number;
  asset: number;
};
interface AreaChartProps {
  data: ChartData[] | null;
  width?: number;
  height?: number;
  yAxisTickCount?: number;
  animationDuration?: number;
  metrics: MetricStyle[];
}

type MetricStyle = {
  metricName: string;
  fillColor: string;
  color: string;
};
const yAxisTickFormater = (value: number, index: number) => {
  if (Math.abs(value) > 1000) {
    const remain = Math.round(value / 1000);
    return `$${remain}k`;
  }
  return `$${value}`;
};

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  const outterColor =
    value >= payload.asset || value < 3 ? "#0d1042" : "#4D4F80";

  return (
    <svg
      fill="none"
      height="10"
      viewBox="0 0 6 6"
      width="10"
      x={cx - 5}
      xmlns="http://www.w3.org/2000/svg"
      y={cy - 5}
    >
      <circle cx="3" cy="3" fill={outterColor} fillOpacity={1} r="3" />
      <circle cx="3" cy="3" fill={stroke} r="2" />
    </svg>
  );
};

export const ComposeHistoryChart = ({
  data,
  width,
  height,
  yAxisTickCount = 5,
  animationDuration = 1000,
  metrics,
}: AreaChartProps) => {
  const yDomain = data ? ["auto", "dataMax"] : [0, 200000];

  const collateralMissing = data?.every((item) => {
    if (item.collateral === null) {
      return true;
    }
    return false;
  });

  let filteredMetrics = metrics;

  if (collateralMissing) {
    filteredMetrics = metrics.filter(
      (item) => item.metricName !== "collateral"
    );
  }

  return (
    <ComposedChart data={data} height={height} width={width}>
      <XAxis
        axisLine={false}
        dataKey="date"
        domain={data ? null : Object.values(monthMapping)}
        id={`x-axis`}
        padding={{ left: 0, right: 0 }}
        stroke="#C6C6C6"
        tick={{ fontSize: 14 }}
        tickLine={false}
      />
      <YAxis
        axisLine={false}
        domain={yDomain}
        orientation="left"
        stroke="#C6C6C6"
        strokeWidth="0.2px"
        style={{ fontWeight: "600" }}
        tick={{ fontSize: 14 }}
        tickCount={yAxisTickCount}
        tickFormatter={yAxisTickFormater}
        tickLine={false}
      />
      <CartesianGrid opacity="0.2" stroke="#ffffff" strokeDasharray="2 2" />
      <Tooltip formatter={(value) => `$${value}`} />
      {!data ? null : (
        <>
          <ReferenceLine stroke="white" y={0} />
          {filteredMetrics.slice(0, 3).map((metric) => (
            <Line
              key={metric.metricName}
              connectNulls
              animationDuration={animationDuration || 1000}
              dataKey={metric.metricName}
              dot={<CustomizedDot />}
              fillOpacity={0.6}
              isAnimationActive={false}
              stroke={metric.fillColor}
              strokeWidth="2px"
            />
          ))}
        </>
      )}
    </ComposedChart>
  );
};
