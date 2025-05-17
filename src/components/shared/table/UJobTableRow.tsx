'use client';
import { MapPin, Bookmark, Users } from 'lucide-react';
import { Job } from '@/utils';
import { formatDate } from '@/utils/helpers';
import UButton from '../UButton';

interface JobTableRowProps {
  variant?: string;
  ownerView?: boolean;
  isApplied?: boolean;
  job: Job;
  onClick: () => void;
}

export default function UJobTableRow({
  variant = 'default', // 'default', 'hover', 'selected'
  ownerView = false,
  isApplied = false,
  job,
  onClick,
}: JobTableRowProps) {
  const statusColorMap = {
    Open: 'green',
    Closed: 'red',
    Paused: 'yellow',
    Archieved: 'gray',
  };
  const color = statusColorMap[job.jobStatus] || 'gray';

  // Get background based on variant
  const getBackgroundColor = () => {
    if (variant === 'hover') return 'bg-gray-100';
    if (variant === 'selected') return 'border border-custom-blue-2';
    return 'bg-white border-2';
  };

  // Component Logo
  const CompanyLogo = ({ imageUrl }) => (
    <div className='w-20 h-20 flex items-center justify-center rounded border'>
      <img src={imageUrl} alt='Company logo' />
    </div>
  );

  // Job Information
  const JobInfo = () => (
    <div className='mx-5 flex-grow'>
      <div className='flex items-center gap-4'>
        <span className='text-lg font-bold'>{job.title}</span>
        <span className='px-3 py-1 bg-custom-blue-1 text-custom-blue-2 text-sm rounded-full'>
          {job.jobType}
        </span>

        <span className={`flex items-center gap-1 text-sm text-${color}-600`}>
          <span className={`w-2 h-2 rounded-full bg-${color}-500`}></span>
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
            <span>{job.salaryRange} VND</span>
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
      <CompanyLogo imageUrl={job.companyImageUrl} />

      <div className='flex-grow'>
        <div className='flex justify-between items-center'>
          <JobInfo />
          <ActionArea />
        </div>
      </div>
    </div>
  );
}
