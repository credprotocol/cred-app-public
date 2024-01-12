import dynamic from "next/dynamic";

import { PageHead } from "@/common/components/PageHead";

const HomePage = dynamic(() => import("@/modules/Home"), {
  loading: () => <div className="h-full bg-cred-blue" />,
});

const Home = () => {
  return (
    <>
      <PageHead description="Cred Protocol" name="Cred Score" />
      <HomePage />
    </>
  );
};

export default Home;
