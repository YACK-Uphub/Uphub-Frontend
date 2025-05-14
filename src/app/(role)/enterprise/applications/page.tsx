import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Applications",
  description: "Manage internship applications for your company on UpHub",
};

const ApplicationsPage = () => {
  return (
    <div>
      <h1>Applications</h1>
      <p>View and manage internship applications submitted to your company.</p>
    </div>
  );
};

export default ApplicationsPage;