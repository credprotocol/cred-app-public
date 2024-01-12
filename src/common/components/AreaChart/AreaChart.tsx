import { memo, useMemo } from "react";
import {
  Area,
  AreaChart as Chart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { CustomizedDot } from "./CustomizedDot";

export interface DataType {
  xAxis: string | number;
  value: number;
}

interface AreaChartProps {
  data: DataType[];
  gradientFrom?: string;
  gradientTo?: string;
  strokeColor?: string;
  width?: string | number;
  height?: string | number;
  yAxisTickCount?: number;
  animationDuration?: number;
}

const AreaChart = memo(
  ({
    data,
    gradientFrom,
    gradientTo,
    strokeColor,
    width,
    height,
    yAxisTickCount,
    animationDuration = 1000,
  }: AreaChartProps) => {
    const memoData = useMemo(() => data, [data]);

    return (
      <ResponsiveContainer height={height || 120} width={width || 300}>
        <Chart
          data={memoData}
          margin={{
            top: 10,
            left: 5,
          }}
        >
          <XAxis
            axisLine={false}
            dataKey="xAxis"
            domain={["dataMin", "dataMax"]}
            id={`x-axis`}
            interval="preserveStartEnd"
            stroke="#C6C6C6"
            tick={{ fontSize: 11 }}
            tickCount={3}
            tickLine={false}
            tickMargin={6}
          />
          <YAxis
            axisLine={false}
            domain={["auto", "auto"]}
            orientation="right"
            stroke="#C6C6C6"
            strokeWidth="0.2px"
            style={{ fontWeight: "600" }}
            tick={{ fontSize: 11 }}
            tickCount={yAxisTickCount || 3}
            tickLine={{
              stroke: "#ffffff",
              opacity: 0.2,
              strokeDasharray: "2 2",
              strokeWidth: "1px",
            }}
            tickMargin={6}
            tickSize={20}
          />
          <defs>
            <linearGradient id="colorValue" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="20%"
                stopColor={gradientFrom || "rgba(96, 255, 93, 0.17)"}
              />
              <stop
                offset="100%"
                stopColor={gradientTo || "rgba(96, 255, 93, 0.01)"}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            opacity="0.2"
            stroke="#ffffff"
            // we are overriding the dash array from vertical cartesian lines (so that it has solid lines)
            // see overrides.scss
            strokeDasharray="2 2"
          />

          <Area
            animationDuration={animationDuration || 1000}
            dataKey="value"
            dot={<CustomizedDot lastElementIndex={data.length - 1} />}
            fill="url(#colorValue)"
            fillOpacity={1}
            stroke={strokeColor || "#60FF5D"}
            strokeWidth="2px"
            type="monotone"
          />
        </Chart>
      </ResponsiveContainer>
    );
  },
  areEqual
);

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

// checking if props are equal
function areEqual(prev: AreaChartProps, next: AreaChartProps) {
  // if returned false component re-renders
  if (prev.animationDuration !== next.animationDuration) {
    return false;
  }

  if (prev.gradientFrom !== next.gradientFrom) {
    return false;
  }

  if (prev.gradientTo !== next.gradientTo) {
    return false;
  }

  if (prev.strokeColor !== next.strokeColor) {
    return false;
  }

  if (prev.width !== next.width) {
    return false;
  }

  if (prev.height !== next.height) {
    return false;
  }

  if (prev.yAxisTickCount !== next.yAxisTickCount) {
    return false;
  }

  return arraysEqual(prev.data, next.data);
}

AreaChart.displayName = "AreaChart";

export default AreaChart;
