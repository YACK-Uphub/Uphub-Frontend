'use client';

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

interface YBlueButtonProps {
	onClick?: () => void;
	label: string;
	width?: string,
	height?: string,
	iconPosition?: 'left' | 'right'; // optional
}

const UBlueButton = ({
	onClick,
	label,
	width = 'w-auto',
	height = 'h-auto',
	iconPosition = 'left',
}: YBlueButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 text-custom-blue-2 bg-custom-blue-1 hover:text-custom-blue-3 font-medium ${width} ${height}`}
		>
			{iconPosition === 'left' && <ChevronLeftIcon className="h-5 w-5 text-custom-black"/>}
			<span>{label}</span>
			{iconPosition === 'right' && <ChevronRightIcon className="h-5 w-5 text-custom-black"/>}
		</button>
	);
};

export default UBlueButton;
