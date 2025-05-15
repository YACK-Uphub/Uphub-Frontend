'use client';

import {ReactNode} from 'react';

export interface UButtonProps {
	onClick: () => void;
	label: string;
	width?: string;
	height?: string;
	backgroundColor?: string;
	textColor?: string;
	border?: string;
	borderRadius?: string;
	icon?: ReactNode; // Accepts any React icon
	iconPosition?: 'left' | 'right' | 'none';
}

const UButton = ({
	onClick,
	label,
	width = 'w-auto',
	height = 'h-auto',
	backgroundColor = 'bg-blue-500',
	textColor = 'text-white',
	border = 'border border-transparent',
	borderRadius = 'rounded-md',
	icon = null,
	iconPosition = 'none',
}: UButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center 
									gap-2 px-6 py-2 font-medium 
									shadow-2xl 
									active:translate-y-[2px] active:shadow-sm
									hover:translate-y-[2px] 
									transition-transform duration-200
        ${width} ${height} ${backgroundColor} ${textColor} ${border} ${borderRadius}`}
		>
			{icon && iconPosition === 'left' && icon}
			<span>{label}</span>
			{icon && iconPosition === 'right' && icon}
		</button>
	);
};

export default UButton;
