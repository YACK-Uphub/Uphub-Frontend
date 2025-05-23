import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companies',
  description: 'Browse companies on UpHub',
};

const CompanyPage = () => {
  return (
    <div>
      <h1>Jobs</h1>
      <p>Explore companies opportunities available on UpHub.</p>
    </div>
  );
};

export default CompanyPage;
