import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Jobs",
  description: "Browse internship opportunities on UpHub",
};

const JobsPage = () => {
  return (
    <div>
      <h1>Jobs</h1>
      <p>Explore internship opportunities available on UpHub.</p>
    </div>
  );
};

export default JobsPage;
