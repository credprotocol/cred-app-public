import React, { useEffect, useState } from "react";

type Controlled = {
  isError?: boolean;
  checked: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  defaultChecked?: undefined;
  onChange?: undefined;
};
type UnControlled = {
  isError?: boolean;
  checked?: undefined;
  onClick?: undefined;
  defaultChecked: boolean;
  onChange: (args: boolean) => void;
};

export const Checkbox = ({
  defaultChecked,
  onChange,
  onClick,
  checked,
  isError,
}: Controlled | UnControlled) => {
  const [internal, setCheck] = useState(defaultChecked);

  useEffect(() => {
    if (!onClick) {
      onChange(internal);
    }
  }, [internal, onChange, onClick]);

  const onClickHandle = onClick ? onClick : () => setCheck((s) => !s);
  const isCheck = checked ? checked : internal;

  return (
    <div className="rounded-md" onClick={onClickHandle}>
      {isCheck ? (
        <svg
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#335EEB" height="20" rx="6" width="20" />
          <path
            d="M14.6666 7.5L8.24992 13.9167L5.33325 11"
            stroke="#FDFDFE"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="black" height="19" rx="5.5" width="19" x="0.5" y="0.5" />
          <rect
            height="19"
            rx="5.5"
            stroke={isError ? "red" : "#414362"}
            strokeWidth={2}
            width="19"
            x="0.5"
            y="0.5"
          />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
