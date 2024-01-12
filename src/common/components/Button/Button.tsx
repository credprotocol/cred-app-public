import classNames from "classnames";
import React, {
  ButtonHTMLAttributes,
  LegacyRef,
  PropsWithChildren,
} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  variant?: "outline" | "primary";
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      variant,
      ...props
    }: PropsWithChildren<Props>,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    const commonClassName =
      "flex gap-2 items-center justify-center text-white transition-colors py-2.5 px-4 rounded-[4px]";

    const variantsClassName = {
      outline:
        "border border-cred-soft-blue bg-black hover:border-cred-light-blue",
      primary: "bg-cred-soft-blue hover:bg-cred-light-blue",
    };

    const className = classNames(
      commonClassName,
      variantsClassName[variant],
      props.className
    );

    return (
      <button {...props} ref={ref} className={classNames(className)}>
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
