import Skeleton from "react-loading-skeleton";

import { Card } from "../Card";
import { DiamondIcon } from "../CustomIcon";

export const LoadingFactor = () => {
  return (
    <Card className="w-[352px]" highLightColorClassName="bg-[#252855]">
      <div className="flex gap-x-2">
        <DiamondIcon className="text-[#252855]" />
        <Skeleton width={194} />
      </div>
      <Skeleton />
      <Skeleton />
      <Skeleton width={200} />
      <Skeleton width={100} />
    </Card>
  );
};
