'use client';

import {Bookmark, MapPin, Users} from 'lucide-react';
import {Job} from '../../.././models';
import {formatDate} from '@/utils/helpers';
import UButton from '../UButton';
import Image from 'next/image';
import {getStyleJobStatus, getStyleRowVariant, URowVariant} from "@/components/shared/table/URowVariant";
import React from "react";

interface UJobRowProps {
  variant?: URowVariant;
  ownerView?: boolean;
  isApplied?: boolean;
  isSelected?: boolean;
  job?: Job;
  onClick?: () => void;
}

export default function UJobRow({
  variant = URowVariant.Default,
  ownerView = false,
  isApplied = false,
  job,
  onClick,
}: UJobRowProps) {

  const styleJobStatus = getStyleJobStatus(job.jobStatus);
  const styleCardVariant = getStyleRowVariant(variant);

  // Job Information
  const JobInfo = () => (
    <div className='mx-5 flex-grow'>
      <div className='flex items-center gap-4'>
        <span className='text-lg font-bold'>{job.title}</span>
        <span className='px-3 py-1 bg-custom-blue-1 text-custom-blue-2 text-sm rounded-full'>
          {job.jobType}
        </span>

        <span className={`flex items-center gap-1 text-sm ${styleJobStatus.text}`}>
          <span className={`w-2 h-2 rounded-full ${styleJobStatus.bg}`}></span>
          <span>{job.jobStatus}</span>
        </span>
      </div>
      <div className='flex items-center text-sm text-custom-gray gap-2 my-3'>
        <span>Hạn nộp đơn: {formatDate(job.closingDate)}</span>
      </div>
      <div className='flex items-center text-xs text-custom-gray gap-4 mt-2'>
        <div className='flex items-center gap-1'>
          <MapPin size={14} />
          <span>{job.city}</span>
        </div>

        {job.salaryRange && (
          <div className='flex items-center gap-1'>
            <span>{job.salaryRange}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Actions
  const ActionArea = () => (
    <div className='flex items-center gap-3'>
      {ownerView ? (
        <>
          <div className='flex items-center gap-1 text-sm text-custom-gray'>
            <Users size={14} className='text-custom-gray' />
            <span>{job.applicationCount}</span>
            <span>Đơn ứng tuyển</span>
          </div>
        </>
      ) : (
        <>
          <Bookmark size={25} className='text-custom-gray' />
        </>
      )}
      <UButton
        label={
          ownerView
            ? 'Xem Tất Cả Đơn'
            : isApplied
            ? 'Chi Tiết'
            : 'Ứng Tuyển Ngay'
        }
        backgroundColor='bg-custom-gray/10'
        textColor='text-custom-blue-2'
        onClick={onClick}
      />
    </div>
  );

  return (
    <div
      className={`px-8 py-4 rounded-lg ${styleCardVariant} hover:bg-gray-100 flex items-center gap-3 border shadow-md transition-all duration-200`}>
      <div className="w-16 h-16 mb-2 relative rounded-md overflow-hidden">
        <Image
          src={job.companyImageUrl}
          alt={`${job.contactEmail} company`}
          fill={true}
          quality={50}
          loading='lazy'
          objectFit={"cover"}
          priority={false}
          placeholder={"blur"}
          blurDataURL={"/images/placeholderImage.png"}
        />
      </div>

      <div className='flex-grow'>
        <div className='flex justify-between items-center'>
          <JobInfo />
          <ActionArea />
        </div>
      </div>
    </div>
  );
}
