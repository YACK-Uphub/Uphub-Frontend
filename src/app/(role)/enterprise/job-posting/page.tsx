import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Job Postings",
  description: "Create and manage internship job postings on UpHub",
};

const JobPostingsPage = () => {
  return (
    <div>
      <h1>Job Postings</h1>
      <p>Create, edit, and manage your company's internship job postings.</p>
    </div>
  );
};

export default JobPostingsPage;