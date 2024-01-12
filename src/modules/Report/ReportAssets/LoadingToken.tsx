import Skeleton from "react-loading-skeleton";

import { Card } from "@/common/components/Card";

export const LoadingToken = () => {
  return (
    <Card className="grow md:w-1/2">
      <Skeleton width={64} />
      <div className="flex justify-center">
        <Skeleton circle height={223} width={223} />
      </div>
      <div className="flex justify-around mt-2">
        {Array(4)
          .fill(1)
          .map((_, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex gap-x-2">
                  <Skeleton circle height={10} width={10} />
                  <Skeleton width={48} />
                </div>
                <Skeleton width={64} />
              </div>
            );
          })}
      </div>
    </Card>
  );
};
