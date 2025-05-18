'use client';
import { MapPin, Bookmark, Users } from 'lucide-react';
import { Job } from '@/utils';
import { formatDate } from '@/utils/helpers';
import UButton from '../UButton';
import Image from 'next/image';
import { lazy } from 'react';

interface JobTableRowProps {
  variant?: string;
  ownerView?: boolean;
  isApplied?: boolean;
  job?: Job;
  onClick?: () => void;
}

export default function UJobTableRow({
  variant = 'default', // 'default', 'hover', 'selected'
  ownerView = false,
  isApplied = false,
  job,
  onClick,
}: JobTableRowProps) {
  const statusStyleMap = {
    Open: {
      text: 'text-green-600',
      bg: 'bg-green-600',
    },
    Closed: {
      text: 'text-red-600',
      bg: 'bg-red-600',
    },
    Paused: {
      text: 'text-yellow-600',
      bg: 'bg-yellow-600',
    },
    Archieved: {
      text: 'text-gray-600',
      bg: 'bg-gray-600',
    },
  };
  const styles = statusStyleMap[job.jobStatus] || {
    text: 'text-gray-600',
    bg: 'bg-gray-600',
  };

  // Get background based on variant
  const getBackgroundColor = () => {
    if (variant === 'hover') return 'bg-gray-100';
    if (variant === 'selected') return 'border border-custom-blue-2';
    return 'bg-white border-2';
  };

  // Job Information
  const JobInfo = () => (
    <div className='mx-5 flex-grow'>
      <div className='flex items-center gap-4'>
        <span className='text-lg font-bold'>{job.title}</span>
        <span className='px-3 py-1 bg-custom-blue-1 text-custom-blue-2 text-sm rounded-full'>
          {job.jobType}
        </span>

        <span className={`flex items-center gap-1 text-sm ${styles.text}`}>
          <span className={`w-2 h-2 rounded-full ${styles.bg}`}></span>
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
        backgroundColor='bg-gray-200'
        textColor='text-custom-blue-2'
        onClick={onClick}
      />
    </div>
  );

  return (
    <div
      className={`px-8 py-4 rounded-lg ${getBackgroundColor()} flex items-center gap-3 transition-all duration-200`}
    >
      <Image
        src={job.companyImageUrl}
        alt='logo company'
        quality={50}
        loading='lazy'
        width={80}
        height={80}
        className='object-contain rounded-md'
      />

      <div className='flex-grow'>
        <div className='flex justify-between items-center'>
          <JobInfo />
          <ActionArea />
        </div>
      </div>
    </div>
  );
}
