"use client"

import React from 'react';
import USearchWithFilter from "@/components/shared/search/USearchWithFilter";
import {BriefcaseIcon, BuildingOffice2Icon, UserPlusIcon, UsersIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

import illustrationImg from "@/../public/images/illustration.png";
import UJobStatCard from "@/features/home/components/hero-section/UJobStatCard";

const statCardsData = [
  {
    icon: <BriefcaseIcon className="h-6 w-6 text-custom-blue-3"/>,
    value: '7,532',
    label: 'Công việc mới',
  },
  {
    icon: <BuildingOffice2Icon className="h-6 w-6 text-custom-white"/>,
    value: '12,430',
    label: 'Người dùng đăng ký',
  },
  {
    icon: <UsersIcon className="h-6 w-6 text-custom-blue-3"/>,
    value: '84',
    label: 'Quốc gia hoạt động',
  },
  {
    icon: <UserPlusIcon className="h-6 w-6 text-custom-blue-3"/>,
    value: '3,218',
    label: 'Bình luận mới',
  },
]

const UHeroSection = () => {
  return (
      <>
        <div className="m-auto flex flex-col items-center gap-8 xl:flex-row">
          {/* Text Content - Left Side */}
          <div className="flex-1 space-y-5">
            <h1 className="text-3xl font-bold text-custom-black md:text-4xl">
              Khởi đầu trải nghiệm:<br/>
              <span className="text-custom-blue-2">Kết nối nhân tài với cơ hội lý tưởng</span>
            </h1>

            <h3 className="text-xl text-custom-gray">Vững vàng hành trang, tương lai rộng mở</h3>

            <USearchWithFilter
                dropdownData={null}
                onSearchSubmitAction={null}
            />

            <p className="text-custom-gray">
              <span className="font-medium text-custom-gray/50">Gợi ý:</span> Designer, Lập trình viên,
              <span className="font-medium text-custom-blue-2"> Digital Marketing</span>, Editor, ...
            </p>
          </div>

          {/* Image - Right Side */}
          <div className="flex h-full w-full max-w-md">
            <Image
                src={illustrationImg}
                alt="uphub hero icon"
                className="w-full object-cover"
                loading="lazy"
                quality={100}
            />
          </div>
        </div>

        {/* Stats Container */}
        <div className={"mt-8"}>
          <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-custom-black">Cơ hội việc làm độc
            quyền</h2>
          <div className={"grid grid-cols-1 gap-8 justify-center md:grid-cols-2 xl:grid-cols-4"}>
            {statCardsData.map((card, index) =>
                (
                    <UJobStatCard
                        key={index}
                        isCompany={index !== 1}
                        icon={card.icon}
                        stat={card.value}
                        jobLabel={card.label}
                    />
                )
            )}
          </div>
        </div>
      </>
  );
};

export default UHeroSection;
