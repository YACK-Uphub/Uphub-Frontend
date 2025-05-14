import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "School Dashboard",
  description: "Manage your school's internship programs on UpHub",
};

const SchoolDashboardPage = () => {
  return (
    <div>
      <h1>School Dashboard</h1>
      <p>Welcome to your school dashboard. Manage students, internship programs, and partner companies.</p>
    </div>
  );
};

export default SchoolDashboardPage;
