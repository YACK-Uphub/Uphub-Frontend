import React from 'react';
import type {Metadata} from 'next';
import UCreateJobForm from "@/features/job/components/UCreateJobForm";

export const metadata: Metadata = {
  title: "Job Postings",
  description: "Create and manage internship models postings on UpHub",
};

const JobPostingsPage = () => {
  return (
      <section className={"py-12 sm:pt-16 mx-auto"}>
        <div className={"px-12 xl:px-0"}>
          <UCreateJobForm></UCreateJobForm>
        </div>
      </section>
  );
};

export default JobPostingsPage;
