import axios from "axios";
import classNames from "classnames";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { Modal } from "@/common/components/Modal";
import { AppContext } from "@/common/context/app.context";
import { getApiUrl } from "@/common/utils/string";

import { Checkbox } from "../../Checkbox";
import { Spinner } from "../../Spinner";
import { SuccessModal } from "./SuccessModal";

export const SubcribeModal = ({ setOpenModal, isMounted }) => {
  const { address } = useAccount();
  const [errorMsg, setErrorMsg] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [notChecked, setNotChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSucess] = useState(false);
  const { auth } = useContext(AppContext);

  const handleSubmit = async () => {
    if (!isCheck) {
      setNotChecked(true);
      return;
    }
    if (errorMsg) {
      return;
    }
    if (!address) {
      toast.error("Please connect with wallet");
    }
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${getApiUrl({
          address,
          endpoint: "monitor/",
        })}/${email}`,
        {
          headers: { Authorization: "Bearer " + auth?.accessToken },
        }
      );
      if (result.data.email) {
        setErrorMsg(
          "This email is already signed up for the Cred Monitoring Service."
        );
      } else {
        setIsSucess(true);
      }
    } catch (error) {
      setErrorMsg("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = (e) => {
    const input = e.target.value;
    const isValidEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        input
      );
    if (!isValidEmail) {
      setErrorMsg("Please enter a valid email address");
    } else {
      setErrorMsg("");
    }
    setEmail(input);
  };
  return (
    <Modal isMounted={isMounted} setOpenModal={setOpenModal}>
      {isSuccess ? (
        <SuccessModal />
      ) : (
        <div className="md:w-[480px] min-h-[calc(100vh-90px)] md:min-h-[auto] md:h-auto">
          {/* Heading Texts */}
          <h1 className="text-[32px] leading-10 mb-2 text-center">
            Monitor your Score
          </h1>

          <div className="md:max-h-[600px]  m-auto overflow-auto">
            <div className="md:max-w-[440px] mb-8 text-center">
              Get notified about changes to your Cred Score. Receive
              personalized tips on improving your score.
            </div>
            <div className="flex relative pb-8">
              <input
                className="grow border border-r-0 rounded rounded-r-none border-cred-dark-gray pl-2 text-base leading-normal outline-none bg-transparent"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={handleChangeEmail}
              />
              <div className="flex">
                <button
                  className="p-4 w-28 text-sm bg-cred-soft-blue border border-l-0 border-cred-soft-blue rounded-r rounded-l-none"
                  disabled={isLoading}
                  type="submit"
                  onClick={isLoading ? null : handleSubmit}
                >
                  {isLoading ? <Spinner /> : "SUBSCRIBE"}
                </button>
              </div>
              <div
                className={classNames(
                  "hidden text-red-500 text-light text-xs font-light absolute bottom-2",
                  {
                    "!block": !!errorMsg,
                  }
                )}
              >
                {errorMsg}
              </div>
            </div>
            <div className=" flex items-center gap-x-3">
              <Checkbox
                checked={isCheck}
                isError={notChecked}
                onClick={() => {
                  setIsCheck((s) => !s);
                  setNotChecked(false);
                }}
              />
              <span>
                I Acknowledge that I have read and accept the{" "}
                <a
                  className="underline"
                  href="https://join.credprotocol.com/legal/privacy"
                  rel="noreferrer"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>
            <div className="text-red-500 text-xs font-light h-[18px]">
              {notChecked ? "This is required" : null}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
