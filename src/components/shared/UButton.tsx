﻿"use client";

import {ReactNode} from "react";
import {debounce} from "@/utils/functionHelpers";

export interface UButtonProps {
  onClick?: () => void;
  label: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  borderRadius?: string;
  icon?: ReactNode; // Accepts any React icon
  iconPosition?: "left" | "right" | "none";
  isSubmitFormButton?: boolean;
}

const UButton = ({
                   onClick,
                   label,
                   width = "w-auto",
                   height = "h-auto",
                   backgroundColor = "bg-blue-500",
                   textColor = "text-white",
                   border = "border border-transparent",
                   borderRadius = "rounded-md",
                   icon = null,
                   iconPosition = "none",
                   isSubmitFormButton = false,
                 }: UButtonProps) => {

  const debouncedClick = onClick ? debounce(onClick, 400) : undefined;

  return (
      <button
          type={isSubmitFormButton ? "submit" : "button"}
          {...(!isSubmitFormButton && {onClick: debouncedClick})}

          className={`flex flex-row items-center justify-center
									gap-2 px-5 py-2 font-medium
									shadow-1xl
									text-xs text-nowrap
									sm:text-base
									active:translate-y-[2px] active:shadow-sm
									hover:translate-y-[2px]
									transition-transform duration-200
                                    cursor-pointer
									${width} ${height} ${backgroundColor} ${textColor} ${border} ${borderRadius}`}
      >
        {icon && iconPosition === "left" && icon}
        <span>{label}</span>
        {icon && iconPosition === "right" && icon}
      </button>
  );
};

export default UButton;
