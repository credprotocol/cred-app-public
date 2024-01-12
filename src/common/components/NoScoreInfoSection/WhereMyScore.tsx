import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

import { Button } from "../Button";

export const WhereMyScore = () => {
  return (
    <InfoCard headingText="where's my score?">
      <div className="flex flex-col gap-y-5 tracking-wide">
        <p>
          Your Cred Score is based on your history of activity interacting with
          lending protocols and digital assets.
        </p>
        <p>
          Once you have enough activity, you{"'"}ll automatically get a score
          that{"'"}ll help you manage your on-chain finances.
        </p>

        <Button
          className="font-semibold px-[11.5px] mt-1 mb-1"
          variant="primary"
        >
          <a
            href="https://credprotocol.typeform.com/to/s1hMxTks"
            rel="noreferrer"
            target="_blank"
          >
            TELL ME WHEN MY SCORE IS READY
          </a>
        </Button>
      </div>
    </InfoCard>
  );
};
