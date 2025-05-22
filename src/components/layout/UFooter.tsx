"use client"

import React from "react";
import Link from "next/link";
import UButton from "@/components/shared/UButton";
import {PiGooglePlayLogo} from "react-icons/pi";
import {RiAppleLine} from "react-icons/ri";
import {CiFacebook, CiInstagram} from "react-icons/ci";
import {FaXTwitter} from "react-icons/fa6";

const Footer = () => {

	const handleGooglePlayClick = () => alert("Google Play clicked!");
	const handleAppStoreClick = () => alert("App Store clicked!");
	const handleXClick = () => alert("X clicked!");
	const handleFacebookClick = () => alert("Facebook clicked!");
	const handleInstaClick = () => alert("Insta clicked!");

	return (
		<>
			<div className="grid grid-cols-1 gap-y-8 gap-x-2 border-t
									  text-sm text-custom-black px-12 py-6
									  md:grid-cols-5">

				{/* Support Section */}
				<section className="md:col-span-1">
					<h4 className="mb-4 text-lg font-semibold">Hỗ trợ</h4>
					<ul className="space-y-3">
						<li><Link href="#" className="hover:text-custom-yellow-3">FAQ</Link></li>
						<li><Link href="#" className="hover:text-custom-yellow-3">Chính sách bảo mật</Link></li>
						<li><Link href="#" className="hover:text-custom-yellow-3">Điều khoản sử dụng</Link></li>
					</ul>
				</section>

				{/* About Us Section */}
				<section className="md:col-span-1">
					<h4 className="mb-4 text-lg font-semibold">Về chúng tôi</h4>
					<ul className="space-y-3">
						<li><Link href="#" className="hover:text-custom-yellow-3">Về UpHub</Link></li>
						<li><Link href="#" className="hover:text-custom-yellow-3">Việc làm tại UpHub</Link></li>
					</ul>
				</section>

				{/* App Links */}
				<section className="flex flex-col items-end justify-end-safe space-y-4 md:col-span-3">
					<UButton
						onClick={handleGooglePlayClick}
						label={"Google Play"}
						width={"w-36"}
						icon={<PiGooglePlayLogo className={"h-4 w-4 cursor-pointer"}/>}
						iconPosition={"left"}
						border={"border border-custom-dark"}
						backgroundColor={"bg-custom-white"}
						textColor={"text-custom-black"}
						borderRadius={"rounded-full"}
					></UButton>

					<UButton
						onClick={handleAppStoreClick}
						label={"App Store"}
						width={"w-36"}
						icon={<RiAppleLine className={"h-4 w-4 cursor-pointer"}/>}
						iconPosition={"left"}
						border={"border border-custom-dark"}
						backgroundColor={"bg-custom-white"}
						textColor={"text-custom-black"}
						borderRadius={"rounded-full"}
					></UButton>
				</section>
			</div>

			{/* Bottom Bar */}
			<div className="grid items-center border-t px-12 py-6 text-sm border-custom-yellow-1 sm:grid-cols-3">
				<ul className="flex gap-4">
					<li>
						<CiFacebook size={24} className="cursor-pointer" onClick={handleFacebookClick}/>
					</li>
					<li>
						<CiInstagram size={24} className="cursor-pointer" onClick={handleInstaClick}/>
					</li>
					<li>
						<FaXTwitter size={24} className="cursor-pointer" onClick={handleXClick}/>
					</li>
				</ul>
				<span
					className={"text-custom-gray text-[12px] justify-self-center-safe align-middle"}>UpHub Copyright &copy; 2025</span>
			</div>
		</>
	);
};

export default Footer;
