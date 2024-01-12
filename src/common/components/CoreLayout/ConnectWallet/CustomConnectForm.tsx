import classNames from "classnames";
import { useEffect, useState } from "react";

import { FormField } from "@/common/components/FormField";

interface Props {
  defaultAddress?: string;
  setOpenModal: (open: boolean) => void;
}

const CustomConnectForm = ({ defaultAddress = "", setOpenModal }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [validInput, setValidInput] = useState(false);

  const onWalletSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Mocking API
    setTimeout(() => {
      setIsSubmitting(false);
      // setOpenModal(false);
    }, 1000);
  };

  const handleOnAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // resetting error on change
    setError("");
    setAddress(event.target.value);
  };

  useEffect(() => {
    if (address.trim() !== "") {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }, [address]);

  const disabled = isSubmitting || !validInput;

  return (
    <form
      className="flex items-start w-full gap-6 mx-auto mb-10"
      onSubmit={onWalletSubmit}
    >
      <div className="flex-1">
        <FormField
          className="border-r-0 rounded-md rounded-r-none"
          errorMessage={error}
          placeholder="Enter your eth address"
          spellCheck={false}
          type="text"
          value={address}
          onChange={handleOnAddressChange}
        />
      </div>
      <button
        className={classNames(
          disabled ? "opacity-40" : "hover:opacity-90",
          "uppercase text-sm font-semibold whitespace-nowrap px-4 rounded-r-md !py-[15px] bg-cred-soft-blue"
        )}
        disabled={disabled}
        type="submit"
      >
        {isSubmitting ? "connecting" : "connect"}
      </button>
    </form>
  );
};

export default CustomConnectForm;
