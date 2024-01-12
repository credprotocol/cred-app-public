import Link from "next/link";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import { SubscribeSection } from "@/common/components/SubscribeSection";
import { APIDispatchContext } from "@/common/context/api.context";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { sandboxEnv } from "@/constant/sanboxEnv";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import { CredScoreTopSection } from "@/modules/Home/CredScoreTopSection";

import { ReportAddressFetch } from "../Report/types";
import { PartnerSection } from "./PartnerSection";

const HomePage = () => {
  const dispatch = useContext(APIDispatchContext);
  const { address } = useAccount();

  const scoreAPI = address
    ? getApiUrl({
        address: address,
        endpoint: "score/address/",
      })
    : null;

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  } = useFetcher(scoreAPI);

  const reportAddressAPI = address
    ? getApiUrl({
        address: address,
        endpoint: "report/address/",
        sandbox: sandboxEnv,
      })
    : null;

  const {
    data: reportAddressData,
    error: reportAddressError,
    loading: reportAddressLoading,
  }: ReportAddressFetch = useFetcher(reportAddressAPI);

  useEffect(() => {
    if (reportAddressLoading) {
      dispatch({ type: "LOADING_REPORT_ADDRESS" });
      return;
    }
    if (reportAddressData || reportAddressError) {
      dispatch({
        type: "SET_REPORT_ADDRESS",
        payload: { data: reportAddressData, error: reportAddressError },
      });
    }
  }, [reportAddressData, reportAddressError, reportAddressLoading, dispatch]);

  const hasScore = !!credScoreData?.value;
  const showReportButton =
    hasScore && !sandboxEnv && reportAddressData !== null;
  return (
    <div className="py-12 md:py-16 px-5 max-w-[1130px] mx-auto">
      {/* Cred score top sections */}
      <div className="flex justify-between items-center h-[51px]">
        <h2 className="mb-4 font-bold text-xl leading-5">My Cred Score</h2>
        {showReportButton && (
          <Link href="/report">
            <Button
              className="mb-4 font-semibold rounded-[6px] tracking-[0.02em] text-sm leading-[15px] py-[8.5px] px-2"
              variant="primary"
            >
              GET REPORT
            </Button>
          </Link>
        )}
      </div>
      <CredScoreTopSection
        address={address}
        credScoreData={credScoreData}
        loading={credScoreLoading}
      />

      {!address || !hasScore ? (
        <PartnerSection loading={credScoreLoading} />
      ) : (
        <CreditFactors loading={credScoreLoading} />
      )}
      <SubscribeSection />
    </div>
  );
};

export default HomePage;
