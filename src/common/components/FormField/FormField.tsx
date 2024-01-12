import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  errorMessage?: string;
}

export const FormField = ({
  placeholder,
  className,
  wrapperClassName,
  errorMessage,
  ...props
}: Props) => {
  return (
    <div className={classNames("w-full", wrapperClassName)}>
      <input
        className={classNames(
          "rounded-4 h-auto w-full py-[14px] text-sm px-3 bg-transparent border border-cred-dark-gray",
          "placeholder-cred-gray focus:outline-none",
          className
        )}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && (
        <p className="mt-1 ml-1 text-xs text-left text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;
