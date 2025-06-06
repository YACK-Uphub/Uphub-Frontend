"use client";
import {ArrowRight, BriefcaseMedical, MapPin} from "lucide-react";
import UButton from "../UButton";
import Image from "next/image";
import React from "react";

interface UCompanyRowProps {
    imageUrl: string;
    companyName: string;
    city: string;
    businessType: string;
    onClickAction?: () => void;
}

export default function UCompanyRow({businessType, city, companyName, imageUrl, onClickAction}: UCompanyRowProps) {
    return (
            <div
                    className={`px-8 py-4 rounded-lg bg-white border-1 hover:bg-gray-100 flex items-center gap-3 shadow-2xs transition-all duration-200`}
            >
                <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-md">
                    <Image
                            src={imageUrl}
                            alt={companyName}
                            fill={true}
                            quality={50}
                            loading="lazy"
                            objectFit={"cover"}
                            priority={false}
                            placeholder={"blur"}
                            blurDataURL={"/images/placeholderImage.png"}
                    />
                </div>

                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        {/* Company infor */}
                        <div className="mx-5 flex-grow">
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-bold">{companyName}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-xs text-custom-gray">
                                <div className="flex items-center gap-1">
                                    <MapPin size={14}/>
                                    <span>{city}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BriefcaseMedical size={14}/>
                                    <span>{businessType}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-3">
                            <UButton
                                    label="Ứng Tuyển Ngay"
                                    backgroundColor="bg-custom-blue-1"
                                    textColor="text-custom-blue-2"
                                    onClick={onClickAction}
                                    icon={<ArrowRight/>}
                                    iconPosition="right"
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
}
