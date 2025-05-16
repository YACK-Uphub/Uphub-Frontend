import {ArrowPathRoundedSquareIcon} from "@heroicons/react/24/outline"; // spinner-like icon
import React from "react";

type UPageSpinnerProps = {
	size?: number;
	className?: string;
};

export const UPageSpinner: React.FC<UPageSpinnerProps> = ({size = 24, className = ""}) => {
	return (
		<ArrowPathRoundedSquareIcon
			className={`animate-spin text-custom-blue-3 ${className}`}
			style={{width: size, height: size}}
		/>
	);
};