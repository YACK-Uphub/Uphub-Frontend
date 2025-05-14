import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Enterprise Dashboard",
  description: "Manage your company's internship opportunities on UpHub",
};

const EnterpriseDashboardPage = () => {
  return (
    <div>
      <h1>Enterprise Dashboard</h1>
      <p>Welcome to your enterprise dashboard. Manage job postings, applications, and more.</p>
    </div>
  );
};

export default EnterpriseDashboardPage;
