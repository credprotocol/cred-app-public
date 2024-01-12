import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";

import { ChevronRightIcon } from "@/common/components/CustomIcon";
import { APIResultContext } from "@/common/context/api.context";
import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

const IMPROVEMENT_FACTOR_INDEX = 6;
const filterText =
  "We don't have enough data to suggest credit scoring feedback to this account at this time.";
const ImprovementFactorLoading = () => {
  return (
    <InfoCard headingText={<Skeleton width={180} />}>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton width={150}></Skeleton>
      <Skeleton className="mt-5" width={90}></Skeleton>
    </InfoCard>
  );
};
const ImprovementFactor = () => {
  const {
    reportAddress: { data, loading },
  } = useContext(APIResultContext);
  const [extend, setExtend] = useState(false);
  const toggleExtend = () => setExtend((s) => !s);

  if (loading) {
    return <ImprovementFactorLoading />;
  }

  if (!data || (data && data?.report?.factors?.length < 7)) {
    return (
      <InfoCard headingText="improvement factor">
        <div className="flex gap-x-2">
          <img
            alt="no token data"
            className="inline w-10 h-10"
            src="/image/no_data_circle.png"
          />
          <p className="tracking-[0.02em] font-normal">{filterText}</p>
        </div>
      </InfoCard>
    );
  }

  const texts =
    data?.report?.factors[IMPROVEMENT_FACTOR_INDEX].description.replaceAll(
      "\n",
      "<br />"
    ) || "";

  const hasBreakLine =
    data?.report?.factors[IMPROVEMENT_FACTOR_INDEX].description.includes("\n");
  const displayText =
    hasBreakLine && !extend ? texts.split("<br />")[0] : texts;

  return (
    <InfoCard headingText="improvement factor">
      <div className="text-base flex flex-col gap-y-4">
        {
          <div>
            <p
              className="inline"
              dangerouslySetInnerHTML={{ __html: displayText }}
            ></p>
            {hasBreakLine ? (
              <u className="pl-1 cursor-pointer" onClick={toggleExtend}>
                {extend ? "see less" : "see more"}
              </u>
            ) : null}
          </div>
        }
      </div>

      {data?.report?.factors[IMPROVEMENT_FACTOR_INDEX].learn_more ? (
        <a
          className="flex items-center gap-2 mt-2 font-semibold text-cred-light-blue group hover:text-cred-soft-blue"
          href={data?.report?.factors[IMPROVEMENT_FACTOR_INDEX].learn_more}
        >
          Learn more
          <span className="group-hover:translate-x-0.5 transition-transform">
            <ChevronRightIcon />
          </span>
        </a>
      ) : null}
    </InfoCard>
  );
};

export default ImprovementFactor;
