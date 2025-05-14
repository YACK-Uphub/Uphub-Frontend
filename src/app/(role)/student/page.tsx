import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Manage your internship applications and profile on UpHub",
};

const StudentDashboardPage = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome to your student dashboard. Manage your profile, applications, and find internship opportunities.</p>
    </div>
  );
};

export default StudentDashboardPage;
