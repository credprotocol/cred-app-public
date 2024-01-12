import Skeleton from "react-loading-skeleton";

import { Card } from "../Card";

export const LoadingRightSection = () => {
  return (
    <>
      <Card className="w-[352px]">
        <Skeleton className="mb-6" width={180} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton className="mb-7" width={100} />
        <Skeleton />
        <Skeleton />
        <Skeleton className="mb-5" width={150} />
        <Skeleton height={40} />
      </Card>
      <Card className="w-[352px]">
        <Skeleton className="mb-6" width={180} />
        <Skeleton />
        <Skeleton className="mb-7" />
        <Skeleton />
        <Skeleton className="mb-5" width={150} />
      </Card>
    </>
  );
};
