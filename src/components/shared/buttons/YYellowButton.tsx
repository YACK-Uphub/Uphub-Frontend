'use client';

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

interface YYellowButtonProps {
	onClick?: () => void;
	label: string;
	width?: string,
	height?: string,
	iconPosition?: 'left' | 'right'; // optional
}

const YYellowButton = ({
	onClick,
	label,
	width = 'w-auto',
	height = 'h-auto',
	iconPosition = 'left',
}: YYellowButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 text-custom-yellow-3 bg-custom-yellow-2 hover:bg-custom-yellow-1 font-medium ${width} ${height}`}
		>
			{iconPosition === 'left' && <ChevronLeftIcon className="h-5 w-5 text-custom-black"/>}
			<span>{label}</span>
			{iconPosition === 'right' && <ChevronRightIcon className="h-5 w-5 text-custom-black"/>}
		</button>
	);
};

export default YYellowButton;
