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
import UIcon from "@/components/shared/UIcon";

const UHeaderNavigation = () => {

	// ==================
	// === Variables
	// ==================

	const BUTTON_LOGIN_LABEL: string = "Đăng Nhập";

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
				<li><UIcon icon={<QuestionMarkCircleIcon/>} onClick={handleHelpClick}></UIcon></li>
				<li><UIcon icon={<EnvelopeIcon/>} onClick={handleMailClick}></UIcon></li>
				<li><UIcon icon={<BellIcon/>} onClick={handleBellClick}></UIcon></li>
				<li><UIcon icon={<UserCircleIcon/>} color={"text-custom-blue-3"} onClick={handleUserClick}></UIcon></li>
			</ul>

			{/*	Divider */}
			<div className="inline-block h-6 w-[1px] bg-custom-gray opacity-50"></div>

			{/* Login Button */}
			<UButton
				label={BUTTON_LOGIN_LABEL}
				iconPosition={"left"}
				icon={<ArrowRightEndOnRectangleIcon className="h-5 w-5 text-custom-white cursor-pointer"/>}
				backgroundColor={"bg-custom-black"}
				textColor={"text-custom-white"}
				borderRadius={"rounded-full"}
				onClick={handleLoginClick}/>

		</nav>
	);
};

export default UHeaderNavigation;