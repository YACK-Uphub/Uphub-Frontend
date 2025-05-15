"use client"

import React from 'react';
import {
	ArrowRightEndOnRectangleIcon,
	BellIcon,
	EnvelopeIcon,
	QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import UButton from "@/components/shared/UButton";

const UHeaderNavigation = () => {

	// ==================
	// === Events
	// ==================

	const handleHelpClick = () => alert("Help clicked!");
	const handleMailClick = () => alert("Mail clicked!");
	const handleBellClick = () => alert("Notifications clicked!");
	const handleUserClick = () => alert("User clicked!");
	const handleLoginClick = () => alert("Login clicked!");

	// ==================
	// === Renders
	// ==================

	return (
		<nav className={"z-10 flex gap-4 items-center"}>

			{/* Icons */}
			<ul className={"flex gap-4 items-center"}>
				<li><QuestionMarkCircleIcon onClick={handleHelpClick} className="h-6 w-6 cursor-pointer"/></li>
				<li><EnvelopeIcon onClick={handleMailClick} className="h-6 w-6 cursor-pointer"/></li>
				<li><BellIcon onClick={handleBellClick} className="h-6 w-6 cursor-pointer"/></li>
				<li><UserCircleIcon className={"w-6 h-6 text-custom-blue-0 cursor-pointer3"} onClick={handleUserClick}/></li>
			</ul>

			{/*	Divider */}
			<div className="inline-block h-6 opacity-50 w-[1px] bg-custom-gray"></div>

			{/* Login Button */}
			<UButton
				label={"Đăng Nhập"}
				iconPosition={"left"}
				icon={<ArrowRightEndOnRectangleIcon className="h-5 w-5 cursor-pointer text-custom-white"/>}
				backgroundColor={"bg-custom-black"}
				textColor={"text-custom-white"}
				borderRadius={"rounded-full"}
				onClick={handleLoginClick}/>

		</nav>
	);
};

export default UHeaderNavigation;