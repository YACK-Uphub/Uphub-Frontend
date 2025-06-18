"use client";

import React from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import UButton from "@/components/shared/UButton";
import {signIn, signOut, useSession} from "next-auth/react";
import {useAppSelector} from "@/libs/rtk/hooks";

const UHeaderNavigation = () => {
  const {data: session, status} = useSession();
  const isLoggedIn = status === "authenticated";
  const role = useAppSelector(state => state.auth.user?.role);

  // ==================
  // === Events
  // ==================

  const handleHelpClick = () => alert("Help clicked!");
  const handleMailClick = () => alert("Mail clicked!");
  const handleBellClick = () => alert("Notifications clicked!");
  const handleUserClick = () => alert("User clicked!");
  const handleLoginClick = () => {
    signIn("id-server", {callbackUrl: "/"}, {prompt: "login"});
    //alert("Login clicked!");
  };

  const handleLogoutClick = () => {
    signOut({callbackUrl: "/"}); // Optional: về trang chính sau logout
  };

  // ==================
  // === Renders
  // ==================

  return (
      <nav className={"z-10 flex gap-4 items-center"}>
        {/* Icons */}
        <ul className={"flex gap-4 items-center"}>
          <li>
            <QuestionMarkCircleIcon onClick={handleHelpClick} className="h-6 w-6 cursor-pointer"/>
          </li>
          <li>
            <EnvelopeIcon onClick={handleMailClick} className="h-6 w-6 cursor-pointer"/>
          </li>
          <li>
            <BellIcon onClick={handleBellClick} className="h-6 w-6 cursor-pointer"/>
          </li>
          <li>
            <UserCircleIcon className={"w-6 h-6 text-custom-blue-0 cursor-pointer3"} onClick={handleUserClick}/>
          </li>
        </ul>

        {/*	Divider */}
        <div className="inline-block h-6 opacity-50 w-[1px] bg-custom-gray"></div>

        {/* Role */}
        {isLoggedIn && <span
            className="rounded-2xl px-4 py-2 text-sm font-medium shadow-lg bg-custom-black/90 text-custom-yellow-3/90">{role}</span>}

        {/*	Divider */}
        {isLoggedIn && <div className="inline-block h-6 opacity-50 w-[1px] bg-custom-gray"></div>}

        {/* Login Button */}
        {isLoggedIn ? (
            <div className="flex items-center gap-2">

          <span className="text-sm font-medium text-custom-blue-2">
            Xin chào, {session.user?.name || session.user?.username}
          </span>
              <UButton
                  label="Đăng Xuất"
                  iconPosition="left"
                  icon={<ArrowLeftEndOnRectangleIcon className="h-5 w-5 cursor-pointer text-custom-white"/>}
                  backgroundColor="bg-custom-black"
                  textColor="text-custom-white"
                  borderRadius="rounded-full"
                  onClick={handleLogoutClick}
              />
            </div>
        ) : (
            <UButton
                label="Đăng Nhập"
                iconPosition="left"
                icon={<ArrowRightEndOnRectangleIcon className="h-5 w-5 cursor-pointer text-custom-white"/>}
                backgroundColor="bg-custom-black"
                textColor="text-custom-white"
                borderRadius="rounded-full"
                onClick={handleLoginClick}
            />
        )}
      </nav>
  );
};

export default UHeaderNavigation;
