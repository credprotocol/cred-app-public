export const FilterPieChart = ({ hasNegative }) => (
  <div className="flex justify-center flex-col items-center h-[223px]">
    <img
      alt="no token data"
      className="block"
      src="/image/no_data_circle.png"
      width={56}
    />
    <p className="font-normal opacity-60 mt-4 text-center max-w-sm">
      {hasNegative
        ? "Data Visual not available at this time. Total Assets only show non-negative values"
        : "Not enough data"}
    </p>
  </div>
);

export const NotEnoughDataSymbol = () => (
  <svg
    fill="none"
    height="46"
    viewBox="0 0 80 46"
    width="80"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="#252855" height="12" rx="6" width="48" x="32" y="6" />
    <rect fill="#252855" height="12" rx="6" width="80" y="34" />
    <circle cx="12" cy="12" fill="#252855" r="12" />
  </svg>
);
