import { PropsWithChildren, useEffect, useState } from "react";

const TOTAL_DASH_ARRAY_VALUE = 198;

interface Props {
  id?: string | number;
  duration?: number;
  delay?: number;
  value?: number;
  isAnimated?: boolean;
  timeFunction?: string;
  minValue?: number;
  maxValue?: number;
  className?: string;
}

export const CircularProgressbar = ({
  id = Math.floor(Math.random() * 1e8),
  duration = 1000,
  delay = 50,
  isAnimated = true,
  timeFunction = "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
  value = 90,
  minValue = 0,
  maxValue = 100,
  children,
  className,
}: PropsWithChildren<Props>) => {
  // adds animation class after adding styles to DOM
  const [classList, setClassList] = useState<string>();

  // get percent
  const percent = ((value - minValue) * 100) / (maxValue - minValue) / 100;

  const dashArray = `${(percent * TOTAL_DASH_ARRAY_VALUE).toFixed(
    0
  )} ${TOTAL_DASH_ARRAY_VALUE}`;

  // initialize stylesheet and animate progress bar
  useEffect(() => {
    if (value < minValue) {
      return;
    }

    if (isAnimated) {
      // Generate animation style file
      let style = document.createElement("style");
      style.innerHTML = `
        @keyframes circle_progress_keyframes_name_${id} {
        from {
          opacity: 1;
          stroke-dasharray: 0, ${TOTAL_DASH_ARRAY_VALUE};
        }
        to {
          opacity: 1;
          stroke-dasharray: ${dashArray}, ${TOTAL_DASH_ARRAY_VALUE};
        }
      }
        
      .circle_progress_bar${id} {
        animation: circle_progress_keyframes_name_${id} ${duration}ms ${delay}ms ${timeFunction} forwards
      }`;

      // Add new style file
      document.getElementsByTagName("head")[0].appendChild(style);

      // Add animation class to svg element
      setClassList(`circle_progress_bar${id}`);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [value]);

  return (
    <svg className={className} viewBox="0 0 110 100">
      <path
        d="M30,90 A40,40 0 1,1 80,90"
        fill="none"
        stroke="#252855"
        style={{
          strokeWidth: 3,
          strokeLinecap: "round",
        }}
      />
      <mask id="arc">
        <path
          className={classList}
          d="M30,90 A40,40 0 1,1 80,90"
          fill="none"
          stroke="white"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeWidth={value ? 9 : 0}
          style={{
            opacity: !isAnimated ? undefined : "0",
            strokeDasharray: !isAnimated
              ? `${dashArray} ${TOTAL_DASH_ARRAY_VALUE}`
              : undefined,
          }}
        />
      </mask>
      {/* Width and height matches svg viewBox */}
      <foreignObject height="100" mask="url(#arc)" width="110" x="0" y="0">
        <div
          className="w-full h-full"
          style={{
            background:
              "conic-gradient(from 206deg at 50% 50%, rgb(255, 93, 93), rgb(106, 93, 255), rgb(93, 120, 255), rgb(93, 255, 245), rgb(96, 255, 93))",
          }}
        ></div>
      </foreignObject>
      {children}
    </svg>
  );
};

export default CircularProgressbar;
