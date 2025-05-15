'use client';

import {ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/outline";

export interface ULoginButtonProps {
	onClick?: () => void;
	label: string;
	width?: string,
	height?: string,
	iconPosition?: 'left' | 'right'; // optional
}

const ULoginButton = ({
	onClick,
	label,
	width = 'w-auto',
	height = 'h-10',
}: ULoginButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 
									font-medium bg-custom-black 
									shadow-md active:translate-y-[2px]
									active:shadow-sm
									transition-transform duration-100
									rounded-full px-4 ${width} ${height}`}
		>
			<ArrowRightEndOnRectangleIcon className="h-5 w-5 text-custom-white cursor-pointer"/>
			<span className={"text-custom-white"}>{label}</span>
		</button>
	);
};

export default ULoginButton;
