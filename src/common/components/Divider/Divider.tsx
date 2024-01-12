import classNames from "classnames";

interface Props {
  textInBetween?: string;
  className?: string;
}

export const Divider = ({ textInBetween, className }: Props) => {
  return (
    <div className={classNames("relative flex items-center", className)}>
      <div className="flex-grow border-t border-white opacity-20"></div>
      {textInBetween && (
        <span className="flex-shrink mx-4 text-sm text-cred-light-gray">
          {textInBetween}
        </span>
      )}
      <div className="flex-grow border-t border-white opacity-20"></div>
    </div>
  );
};

export default Divider;
