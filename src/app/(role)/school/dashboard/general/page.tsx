import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "General Dashboard",
  description: "Overview of your school's performance on UpHub",
};

const GeneralDashboardPage = () => {
  return (
    <div>
      <h1>General Dashboard</h1>
      <p>View an overview of your school's performance, key metrics, and recent activities on UpHub.</p>
    </div>
  );
};

export default GeneralDashboardPage;