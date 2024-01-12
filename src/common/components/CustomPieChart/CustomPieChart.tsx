import { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";

import { iconColorMapping } from "@/modules/Report/constant";
import { getTailwindColor } from "@/styles/theme";

type DataType = {
  name: string;
  value: number;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      dominantBaseline="central"
      fill="black"
      fontSize="12"
      textAnchor={x > cx ? "start" : "end"}
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type CustomPieChartProps = {
  width: number;
  height: number;
  circleColor: string;
  data: DataType[];
};
const getActiveTokenColor = (name) => {
  let color = iconColorMapping[name];
  if (!color) {
    color = getTailwindColor("light-gray");
  }
  return color;
};
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const color = getActiveTokenColor(payload.name);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text dy={8} fill={color} textAnchor="middle" x={cx} y={cy}>
        {payload.name}
      </text>
      <Sector
        color="white"
        cx={cx}
        cy={cy}
        endAngle={endAngle}
        fill={color}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        stroke="#0D1042"
        strokeWidth={5}
      />
      <Sector
        cx={cx}
        cy={cy}
        endAngle={endAngle}
        fill={color}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        fill="none"
        stroke={color}
      />
      <circle cx={ex} cy={ey} fill={color} r={2} stroke="none" />
      <text
        dy={5}
        fill={color}
        fontSize={10}
        textAnchor={textAnchor}
        x={ex + (cos >= 0 ? 1 : -1) * 10}
        y={ey}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
const CustomPieChart = ({
  width,
  height,
  data,
  circleColor,
}: CustomPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart height={height} width={width}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        cx="50%"
        cy="50%"
        data={data}
        dataKey="value"
        endAngle={-280}
        fill={circleColor}
        innerRadius={55}
        isAnimationActive={false}
        labelLine={false}
        outerRadius={80}
        startAngle={80}
        onMouseEnter={onPieEnter}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} stroke="black" />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
