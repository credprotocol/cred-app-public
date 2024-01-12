import { HTMLAttributes } from "react";

import { RadioActive, RadioNormal } from "../CustomIcon/svg/Radio";

type RadioButtonProps = HTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  label: string;
};

export const RadioButton = ({ checked, onClick, label }: RadioButtonProps) => {
  return (
    <div className="inline-flex gap-x-1 cursor-pointer" onClick={onClick}>
      {checked ? <RadioActive /> : <RadioNormal />}
      <span>{label}</span>
    </div>
  );
};
