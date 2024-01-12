import HowToCompare from "@/modules/Home/CredScoreTopSection/InfoSections/HowToCompare";
import ImprovementFactor from "@/modules/Home/CredScoreTopSection/InfoSections/ImprovementFactor";
import YourCredHistory from "@/modules/Home/CredScoreTopSection/InfoSections/YourCredHistory";

interface Props {
  animationDuration?: number;
  decile: string;
  valueRating: string;
}

export const InfoSections = ({
  animationDuration,
  decile,
  valueRating,
}: Props) => {
  return (
    <>
      <HowToCompare decile={decile} valueRating={valueRating} />
      <ImprovementFactor />
      {/* <YourCredHistory animationDuration={animationDuration} /> */}
    </>
  );
};

export default InfoSections;
