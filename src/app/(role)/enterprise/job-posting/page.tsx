import React from 'react';
import type {Metadata} from 'next';
import UCreateJobForm from "@/features/job/components/UCreateJobForm";

export const metadata: Metadata = {
	title: "Job Postings",
	description: "Create and manage internship models postings on UpHub",
};

const JobPostingsPage = () => {
	return (
      <UCreateJobForm></UCreateJobForm>
	);
};

export default JobPostingsPage;
