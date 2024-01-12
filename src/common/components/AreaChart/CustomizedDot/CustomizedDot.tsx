export const CustomizedDot = (props) => {
  const { cx, cy, index, lastElementIndex } = props;

  if (index === lastElementIndex) {
    return (
      <svg
        fill="none"
        height="32"
        viewBox="0 0 32 32"
        width="32"
        x={cx - 16}
        xmlns="http://www.w3.org/2000/svg"
        y={cy - 12}
      >
        <g filter="url(#filter0_d_1219_1871)">
          <circle cx="16" cy="12" fill="#60FF5D" r="8" />
        </g>
        <circle cx="16" cy="12" fill="white" r="3" />
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="32"
            id="filter0_d_1219_1871"
            width="32"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              mode="normal"
              result="effect1_dropShadow_1219_1871"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_1219_1871"
              mode="normal"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      fill="none"
      height="10"
      viewBox="0 0 10 10"
      width="10"
      x={cx - 5}
      xmlns="http://www.w3.org/2000/svg"
      y={cy - 5}
    >
      <circle cx="5" cy="5" fill="#60FF5D" r="3" />
      <circle
        cx="5"
        cy="5"
        r="4"
        stroke="#0D1042"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CustomizedDot;
