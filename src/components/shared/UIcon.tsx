'use client';

import React, {ReactNode} from 'react';

interface UIconProps {
	height?: string;
	width?: string;
	color?: string;
	icon: ReactNode;
	onClick?: () => void;
}

const UIcon = ({
	height = 'h-6',
	width = 'w-6',
	color = 'text-custom-dark',
	icon,
	onClick,
}: UIconProps) => {
	return (
		<div
			onClick={onClick}
			className={`cursor-pointer ${height} ${width} ${color}`}
		>
			{icon}
		</div>
	);
};

export default UIcon;
