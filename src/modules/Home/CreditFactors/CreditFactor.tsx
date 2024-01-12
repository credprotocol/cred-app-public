import { Card } from "@/common/components/Card";
import { ChevronRightIcon, DiamondIcon } from "@/common/components/CustomIcon";

interface Props {
  variant: "excellent" | "very good" | "good" | "fair" | "low";
  primaryText: string;
  secondaryText: string;
  link?: string;
}

const CreditFactor = ({
  variant,
  primaryText,
  secondaryText,
  link = undefined,
}: Props) => {
  const variantsClassName = {
    excellent: {
      highLightColorClassName: "bg-cred-excellent-credit",
      borderColor: "border-cred-excellent-credit-opacity-0.1",
      iconColorClassName: "text-cred-excellent-credit",
    },
    "very-good": {
      highLightColorClassName: "bg-cred-very-good-credit",
      borderColor: "border-cred-very-good-credit-opacity-0.1",
      iconColorClassName: "text-cred-very-good-credit",
    },
    good: {
      highLightColorClassName: "bg-cred-good-credit",
      borderColor: "border-cred-good-credit-opacity-0.1",
      iconColorClassName: "text-cred-good-credit",
    },
    fair: {
      highLightColorClassName: "bg-cred-fair-credit",
      borderColor: "border-cred-fair-credit-opacity-0.1",
      iconColorClassName: "text-cred-fair-credit",
    },
    low: {
      highLightColorClassName: "bg-cred-low-credit",
      borderColor: "border-cred-low-credit-opacity-0.1",
      iconColorClassName: "text-cred-low-credit",
    },
  };

  const requiredClassName = variantsClassName[variant];

  return (
    <Card
      borderColor={requiredClassName.borderColor}
      highLightColorClassName={requiredClassName.highLightColorClassName}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <DiamondIcon className={requiredClassName.iconColorClassName} />
              <h3 className="text-lg font-bold leading-5">{primaryText}</h3>
            </div>

            <p className="mb-4 tracking-wide">{secondaryText}</p>
          </div>
        </div>
        {link ? (
          <a
            className="flex items-center gap-2 mt-2 font-semibold bottom-2 text-cred-light-blue group hover:text-cred-soft-blue"
            href={link}
          >
            Learn more
            <span className="group-hover:translate-x-0.5 transition-transform">
              <ChevronRightIcon />
            </span>
          </a>
        ) : null}
      </div>
    </Card>
  );
};

export default CreditFactor;
