import classNames from "classnames";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "../CustomIcon";

type DropDownOptions = {
  label: string;
  value: string;
};
type DropdownProps = HTMLAttributes<HTMLSelectElement> & {
  options: DropDownOptions[];
  onChange?: (item: DropDownOptions) => void;
  value?: string;
};
export const Dropdown = ({
  options,
  className,
  value,
  onChange = () => {},
}: DropdownProps) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(value || options[0].value);
  const ref = useRef(null);

  const handleClickOption = (item: DropDownOptions) => (e) => {
    e.stopPropagation();
    setSelected(item.value);
    onChange(item);
    setActive(false);
  };
  const handleOpenDropdown = () => {
    setActive(true);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={classNames("relative dropdown-button", className)}
      onClick={handleOpenDropdown}
    >
      <div>
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-flex relative min-w-[100px] gap-x-4 justify-start rounded-[4px] border border-cred-dark-gray px-2 py-1 pr-3 shadow-sm text-sm font-normal leading-[22px] "
          id="menu-button"
          type="button"
        >
          {options.find((i) => i.value === selected).label || ""}
          <ChevronDownIcon
            className="absolute right-3 top-1"
            fill="none"
            stroke="white"
          />
        </button>
      </div>
      <div
        aria-labelledby="menu-button"
        aria-orientation="vertical"
        className={classNames(
          "absolute hidden w-full shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none z-50 bg-cred-blue",
          active ? "!block" : ""
        )}
        role="menu"
      >
        <div className="py-1" role="none">
          {options
            .filter((i) => i.value !== selected)
            .map((item) => {
              return (
                <span
                  key={item.value}
                  className="block hover:bg-cred-dark-gray p-2 hover:text-gray-300 text-sm cursor-pointer"
                  role="menuitem"
                  onClick={handleClickOption(item)}
                >
                  {item.label}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};
