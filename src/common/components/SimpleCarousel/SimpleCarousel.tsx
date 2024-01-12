import { useEffect, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "../CustomIcon";

type SimpleCarouselProps = {
  visibleItems: number;
  data: any[];
  renderer: (props: any) => JSX.Element;
};

export const SimpleCarousel = ({
  visibleItems,
  data,
  renderer,
}: SimpleCarouselProps) => {
  const [page, setPage] = useState(0);
  const visibleData = data.slice(page, page + visibleItems);

  const isEnd = page === Math.ceil(data.length / visibleItems) - 1;
  const isStart = page === 0;

  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <div className="flex w-full justify-between">
      <button
        disabled={isStart}
        style={{ opacity: isStart ? 0.2 : 1 }}
        onClick={() => setPage((p) => p - 1)}
      >
        <ChevronRightIcon className="rotate-180" />
      </button>
      <div className="grow flex justify-around">
        {visibleData.map(renderer)}
      </div>
      <button
        disabled={isEnd}
        style={{ opacity: isEnd ? 0.2 : 1 }}
        onClick={() => setPage((p) => p + 1)}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};
