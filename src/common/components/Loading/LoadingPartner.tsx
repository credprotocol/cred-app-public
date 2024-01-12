import Skeleton from "react-loading-skeleton";

import { Card } from "../Card";

export const LoadingPartner = () => {
  return (
    <Card childWrapperClass="pt-0" className="w-[352px] overflow-hidden">
      <div className="h-[140px] bg-[#030530]"></div>
      <div className="p-6 pb-8">
        <Skeleton className="mb-6" width={100} />
        <Skeleton />
        <Skeleton />
        <Skeleton className="mb-6" width={100} />
        <Skeleton width={124} />
      </div>
    </Card>
  );
};
