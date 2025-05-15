"use client"

import React from 'react';
import {BellIcon, EnvelopeIcon, QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import ULoginButton from "@/components/shared/buttons/ULoginButton";

const UNavigation = () => {

	// ==================
	// === Variables
	// ==================

	const BUTTON_LOGIN_LABEL: string = "Đăng Nhập"

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
				<li><QuestionMarkCircleIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={handleHelpClick}/></li>
				<li><EnvelopeIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={handleMailClick}/></li>
				<li><BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" onClick={handleBellClick}/></li>
				<li><UserCircleIcon className="h-6 w-6 text-custom-blue-3 cursor-pointer" onClick={handleUserClick}/></li>
			</ul>

			{/*	Divider */}
			<div className="inline-block h-6 w-[1px] bg-custom-gray opacity-50"></div>

			{/* Login Button */}
			<ULoginButton label={BUTTON_LOGIN_LABEL} onClick={handleLoginClick}/>

		</nav>
	);
};

export default UNavigation;