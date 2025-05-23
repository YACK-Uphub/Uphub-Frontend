import React from 'react';
import type { Metadata } from 'next';
import UJobList from '@/features/job/components/UJobList';

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Browse internship opportunities on UpHub',
};

const JobListing = () => {
  return (
    <div>
      <h1>Jobs</h1>
      <UJobList />
    </div>
  );
};

export default JobListing;
