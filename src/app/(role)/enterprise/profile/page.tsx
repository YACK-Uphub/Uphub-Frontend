import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Manage your company profile on UpHub",
};

const CompanyProfilePage = () => {
  return (
    <div>
      <h1>Company Profile</h1>
      <p>Update your company information, logo, and description visible to students and schools.</p>
    </div>
  );
};

export default CompanyProfilePage;