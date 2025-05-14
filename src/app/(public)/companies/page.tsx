import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Companies",
  description: "Browse companies partnered with UpHub",
};

const CompaniesPage = () => {
  return (
    <div>
      <h1>Companies</h1>
      <p>Explore companies that are partnered with UpHub for internship opportunities.</p>
    </div>
  );
};

export default CompaniesPage;
