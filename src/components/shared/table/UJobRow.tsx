"use client";

import { Bookmark, MapPin, Users } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import UButton from "../UButton";
import Image from "next/image";
import {
    getStyleApplicationStatus,
    getStyleJobStatus,
    getStyleRowVariant,
    URowVariant,
} from "@/components/shared/table/URowVariant";
import React from "react";
import { Job, JobStatus } from "@/types/job";
import { ApplicationStatus } from "@/types/application";

interface UJobRowProps {
    variant?: URowVariant;
    ownerView?: boolean;
    isApplied?: boolean;
    isSelected?: boolean;
    jobTitle: string;
    jobType: string;
    jobStatus?: JobStatus;
    applicationStatus?: ApplicationStatus;
    closingDate?: Date;
    applicatedDate?: Date;
    salaryRange: string;
    city: string;
    applicationCount?: number;
    imageUrl: string;
    onClick?: () => void;
}

export default function UJobRow({
    variant = URowVariant.Default,
    ownerView = false,
    isApplied = false,
    jobTitle,
    jobType,
    salaryRange,
    applicatedDate,
    closingDate,
    jobStatus,
    applicationStatus,
    applicationCount = 10,
    imageUrl,
    city,
    onClick,
}: UJobRowProps) {
    const styleJobStatus = getStyleJobStatus(jobStatus);
    const styleCardVariant = getStyleRowVariant(variant);
    const styleApplicationStatus = getStyleApplicationStatus(applicationStatus);

    // Job Information
    const JobInfo = () => (
        <div className="mx-5 flex-grow">
            <div className="flex items-center gap-4">
                <span className="text-lg font-bold">{jobTitle}</span>
                {isApplied ? (
                    <span
                        className={`rounded-full px-3 py-1 text-sm ${styleApplicationStatus.bg} ${styleApplicationStatus.text}`}
                    >
                        {applicationStatus}
                    </span>
                ) : (
                    <span className="rounded-full px-3 py-1 text-sm bg-custom-blue-1 text-custom-blue-2">
                        {jobType}
                    </span>
                )}

                <span className={`flex items-center gap-1 text-sm ${styleJobStatus.text}`}>
                    <span className={`w-2 h-2 rounded-full ${styleJobStatus.bg}`}></span>
                    <span>{jobStatus}</span>
                </span>
            </div>
            <div className="my-3 flex items-center gap-2 text-sm text-custom-gray">
                <span>
                    {isApplied
                        ? `Ngày nộp đơn: ${formatDate(applicatedDate)}`
                        : `Hạn nộp đơn: ${formatDate(closingDate)}`}
                </span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-custom-gray">
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{city}</span>
                </div>

                {salaryRange && (
                    <div className="flex items-center gap-1">
                        <span>{salaryRange}</span>
                    </div>
                )}
            </div>
        </div>
    );

    // Actions
    const ActionArea = () => (
        <div className="flex items-center gap-3">
            {ownerView ? (
                <>
                    <div className="flex items-center gap-1 text-sm text-custom-gray">
                        <Users size={14} className="text-custom-gray" />
                        <span>{applicationCount}</span>
                        <span>Đơn ứng tuyển</span>
                    </div>
                </>
            ) : (
                <>
                    <Bookmark size={25} className="text-custom-gray" />
                </>
            )}
            <UButton
                label={ownerView ? "Xem Tất Cả Đơn" : isApplied ? "Chi Tiết" : "Ứng Tuyển Ngay"}
                backgroundColor="bg-custom-gray/10"
                textColor="text-custom-blue-2"
                onClick={onClick}
            />
        </div>
    );

    return (
        <div
            className={`px-8 py-4 ${styleCardVariant} hover:bg-gray-100 flex items-center gap-3 transition-all duration-200`}
        >
            <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-md">
                <Image
                    src={imageUrl}
                    alt="company image"
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
                <div className="flex items-center justify-center">
                    <JobInfo />
                    <ActionArea />
                </div>
            </div>
        </div>
    );
}
