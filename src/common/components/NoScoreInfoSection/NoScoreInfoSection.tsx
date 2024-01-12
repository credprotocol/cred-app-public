import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

export const NoScoreInfoSection = ({ children }) => {
  return (
    <>
      {children}
      <InfoCard headingText="how do i build my credit?">
        <div className="flex flex-col gap-y-5">
          <p>
            The products listed below are popular places to engage with digital
            assets.
          </p>
          <p className="tracking-wide">
            Using them helps build your credit history.
          </p>
        </div>
      </InfoCard>
    </>
  );
};
