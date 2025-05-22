"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

export interface USubHeaderProps {
	navItems: { name: string; path: string }[];
}

const USubHeader = ({navItems}: USubHeaderProps) => {

	const pathname = usePathname();

	return (
		<nav>
			<ul className={"flex items-center justify-center text-xs sm:text-base gap-10 text-custom-white font-extralight bg-custom-blue-2 py-2"}>
				{navItems.map((item, index) => {

						// avoid / in starting at all route
						const isActivePath =
							item.path === '/'
								? pathname === '/'
								: pathname.startsWith(item.path);

						return (
							<li key={index}>
								<Link href={item.path} className={isActivePath ? "text-custom-yellow-3" : ""}>{item.name}</Link>
							</li>)
					}
				)}
			</ul>
		</nav>
	);
};

export default USubHeader;