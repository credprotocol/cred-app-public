import { useState } from "react";
import Skeleton from "react-loading-skeleton";

import { RadioButton } from "@/common/components/RadioButton";
import { ReportAssetResult } from "@/types/api";

import { InfoWithTooltip } from "../InfoWithTooltip";
import { SunburstChart } from "../SunburtChart";

const options = [
  {
    label: "Total Assets",
    value: "asset_in_wallet_usd",
  },
  {
    label: "Deposit",
    value: "deposit_usd",
  },
  {
    label: "Collateral",
    value: "collateral_usd",
  },
  {
    label: "Debt",
    value: "debt_usd",
  },
];
type Props = {
  data: ReportAssetResult;
  loading: boolean;
};
const YourHoldingSkeleton = () => {
  return (
    <div className="relative justify-center flex mb-20 mt-20">
      <svg
        fill="none"
        height="380"
        viewBox="0 0 380 380"
        width="380"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M364 190C364 237.323 345.108 280.234 314.454 311.602C282.861 343.932 238.774 364 190 364C136.429 364 88.513 339.791 56.5946 301.716C31.2564 271.49 16 232.527 16 190C16 142.677 34.892 99.7657 65.5455 68.3977C97.1388 36.0681 141.226 16 190 16C238.774 16 282.861 36.0681 314.454 68.3977C345.108 99.7657 364 142.677 364 190Z"
          stroke="#252855"
          strokeWidth="32"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Skeleton circle className="mb-4" height={20} width={20} />
        <Skeleton width={150} />
        <Skeleton width={150} />
      </div>
    </div>
  );
};
export const ReportYourHolding = ({ data, loading }: Props) => {
  const [metric, setMetric] = useState(options[0].value);

  if (loading) {
    return <YourHoldingSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold leading-[20px]">
          Your holdings
          <InfoWithTooltip>
            <div className="w-[209px] text-xs">
              <p>
                Breakdown of Holdings per metric grouped by Total, Protocols,
                and Chains.
              </p>
            </div>
          </InfoWithTooltip>
        </h2>
        <div className="flex gap-x-4">
          {options.map((item) => (
            <RadioButton
              key={item.value}
              checked={item.value === metric}
              label={item.label}
              onClick={() => setMetric(item.value)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <SunburstChart assetData={data} metric={metric} />
      </div>
    </>
  );
};
