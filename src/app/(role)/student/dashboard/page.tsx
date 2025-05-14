import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "View your internship applications and opportunities on UpHub",
};

const StudentDashboardPage = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>View your internship applications, favorite jobs, and personalized recommendations.</p>
    </div>
  );
};

export default StudentDashboardPage;