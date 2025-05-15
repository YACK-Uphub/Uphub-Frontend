'use client';

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

interface ButtonProps {
	onClick?: () => void;
	label: string;
	width?: string,
	height?: string,
	iconPosition?: 'left' | 'right'; // optional
}

const CustomBlueButton = ({
	onClick,
	label,
	width = 'w-auto',
	height = 'h-auto',
	iconPosition = 'left',
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 text-custom-blue-2 hover:text-custom-blue-3 font-medium ${width} ${height}`}
		>
			{iconPosition === 'left' && <ChevronLeftIcon className="h-5 w-5 text-gray-500"/>}
			<span>{label}</span>
			{iconPosition === 'right' && <ChevronRightIcon className="h-5 w-5 text-gray-500"/>}
		</button>
	);
};

export default CustomBlueButton;
