import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "/logo.png";

const ULogo = () => {
	return (
		<div>
			<Link href={"/"}>
				<Image src={logo}
							 alt={"Uphub ULogo"}
							 quality={50}
				/>
			</Link>
		</div>
	);
};

export default ULogo;