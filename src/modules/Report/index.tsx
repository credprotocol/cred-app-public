import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { Button } from "@/common/components/Button";
import { ChevronLeftIcon } from "@/common/components/CustomIcon";
import { APIDispatchContext } from "@/common/context/api.context";
import { AppContext } from "@/common/context/app.context";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { sandboxEnv } from "@/constant/sanboxEnv";

import ReportAssets from "./ReportAssets";
import { ReportHistoryChart } from "./ReportHistoryChart";
import ReportStatistic from "./ReportStatistic";
import { ReportYourHolding } from "./ReportYourHolding";
import { ReportAddressFetch } from "./types";

type ReportPageProps = {
  address: string;
};

const ReportPage = ({ address }: ReportPageProps) => {
  const dispatch = useContext(APIDispatchContext);
  const scoreAPI = getApiUrl({
    address,
    endpoint: "report/address/",
    sandbox: sandboxEnv,
  });
  const encryptAPI = getApiUrl({
    address,
    endpoint: "encrypt/asset/address/",
  });
  const { auth } = useContext(AppContext);

  let [isReportDownloading, setIsReportingDownloading] = useState(false);

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  }: ReportAddressFetch = useFetcher(scoreAPI);

  useEffect(() => {
    if (credScoreLoading) {
      dispatch({ type: "LOADING_REPORT_ADDRESS" });
      return;
    }
    if (credScoreError || credScoreData) {
      dispatch({
        type: "SET_REPORT_ADDRESS",
        payload: { data: credScoreData, error: credScoreError },
      });
    }
  }, [credScoreData, credScoreError, credScoreLoading, dispatch]);

  const downloadReport = async () => {
    //alert("test");
    //const result = useFetcher(encryptAPI);

    setIsReportingDownloading(true);

    const result = await axios
      .get(encryptAPI, {
        responseType: "blob",
        headers: { Authorization: "Bearer " + auth?.accessToken },
      })
      .then((response) => {
        // Structure file name
        const currentDate = new Date()
          .toLocaleDateString()
          .replaceAll("/", "-");
        const fileName = `${address}-credit-report-${currentDate}.pdf`;
        // Create a URL object from the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element with the URL as its href
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);

        // Append the link to the document and click it to download the file
        document.body.appendChild(link);
        link.click();

        setIsReportingDownloading(false);
      });
  };

  return (
    <div className="py-12 md:py-16 px-5 max-w-[1130px] mx-auto">
      <Link href="/">
        <Button className="text-sm font-medium leading-[14px] pt-0 pb-0 pl-0 pr-0 mb-8">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 flex items-center justify-center">
              <ChevronLeftIcon />
            </div>
            Back to credit score
          </div>
        </Button>
      </Link>
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold leading-[20px]">Cred Report</h2>
            <span className="tracking-[0.16em] text-sm text-cred-light-blue">
              <span className="font-medium">powered by</span>
              <span className="font-extrabold"> Cred Protocol</span>
            </span>
          </div>
          <div>
            <Button
              className="text-sm font-semibold pt-[8.5px] pb-[8.5px] px-3 leading-[15px] tracking-[0.02em] rounded-[6px]"
              variant="primary"
              onClick={downloadReport}
            >
              {isReportDownloading ? "DOWNLOADING..." : "DOWNLOAD YOUR REPORT"}
            </Button>
          </div>
        </div>
      </div>
      <hr className="my-8 text-white/20" />
      <ReportYourHolding
        data={credScoreData?.report?.assets}
        loading={credScoreLoading}
      />
      <ReportHistoryChart
        data={credScoreData?.report?.asset_history}
        loading={credScoreLoading}
      />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <ReportStatistic />
        <ReportAssets
          assetAPIData={credScoreData?.report?.assets}
          assetAPIError={credScoreError}
          assetAPILoading={credScoreLoading}
        />
      </div>
    </div>
  );
};

export default ReportPage;
