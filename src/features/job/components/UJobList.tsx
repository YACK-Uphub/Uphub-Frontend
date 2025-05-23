'use client';
import { UCardJob } from '@/components/shared/card/UCardJob';
import { UPageSpinner } from '@/components/shared/spinner/UPageSpinner';
import { useAppDispatch, useAppSelector } from '@/libs/rtk/hooks';
import { useGetJobsQuery } from '@/services/jobsApi';
import React from 'react';

export default function UJobList() {
  const jobParams = useAppSelector((state) => state.job);
  const { data, isLoading } = useGetJobsQuery(jobParams);
  //const dispatch = useAppDispatch();

  if (isLoading) return <UPageSpinner />;

  return (
    <>
      {!data ? (
        <div>empty list</div>
      ) : (
        <>
          <div className='grid grid-cols-3 gap-10'>
            {data.results.map((job: any) => (
              <UCardJob
                companyLogoUrl={job.companyLogoUrl}
                companyName={job.companyName}
                jobTitle={job.title}
                jobType={job.jobType}
                location={job.location}
                salaryRange={job.salaryRange}
                variant={job.variant}
                isFeatured={job.isFeatured}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
