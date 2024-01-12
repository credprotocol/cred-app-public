import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { PageHead } from "@/common/components/PageHead";

const ReportPage = dynamic(() => import("@/modules/Report"), {
  loading: () => <div className="h-full bg-cred-blue" />,
});

const Report = () => {
  const router = useRouter();
  let { address } = useAccount();

  if (!address) {
    toast.error("Please connect your wallet", {
      id: "error",
      duration: 1000,
    });
    router.push("/");
    return <div>Loading....</div>;
  }

  return (
    <>
      <PageHead description="Cred Protocol" name="Report" />
      <ReportPage address={address} />
    </>
  );
};

export default Report;
