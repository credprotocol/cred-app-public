import toast from "react-hot-toast";

import { LoadingPartner } from "@/common/components/Loading";
import PartnerCard from "@/common/components/PartnerCard";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { RecommendedFetch } from "@/modules/Report/types";

type Props = {
  loading: boolean;
};
export const PartnerSection = ({ loading }: Props) => {
  const recommendAPI = getApiUrl({
    address: "0x",
    endpoint: "recommendation/address/",
  });

  const {
    data: recommendedData,
    error: recommendedError,
    loading: recommendedLoading,
  }: RecommendedFetch = useFetcher(recommendAPI, false);

  if (recommendedError) {
    toast.error("Fetch recommended data error", {
      id: "fetchRecommendedError",
    });
  }

  return (
    <section className="mt-6">
      <h2 className="mb-6 font-bold">Build your web3 credit score</h2>
      <div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(recommendedData?.recommendations || Array(6).fill(1)).map(
            (partner, index) =>
              loading || recommendedLoading ? (
                <LoadingPartner key={index} />
              ) : (
                <PartnerCard
                  key={partner.name || index}
                  desc={partner.description}
                  imgUrl={partner.logo}
                  label={partner.name}
                  link={partner.url}
                />
              )
          )}
        </div>
      </div>
    </section>
  );
};
