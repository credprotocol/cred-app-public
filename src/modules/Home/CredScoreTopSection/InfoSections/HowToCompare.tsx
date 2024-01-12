import { StarIcon } from "@/common/components/CustomIcon";
import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

const HowToCompare = ({ decile, valueRating }) => {
  return (
    <InfoCard headingText="how you compare">
      <div className="flex items-center gap-2.5">
        <div>
          <StarIcon className="text-white stroke-current" />
        </div>
        <p className="text-base">
          Your score is <span className="font-bold">{valueRating} </span> and{" "}
          <span className="font-bold">
            ranks in the {parseInt(decile) * 10}th percentile
          </span>{" "}
          of accounts.
        </p>
      </div>
    </InfoCard>
  );
};

export default HowToCompare;
