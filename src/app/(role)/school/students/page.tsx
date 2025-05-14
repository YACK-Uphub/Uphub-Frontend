import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Students Management",
  description: "Manage students from your school on UpHub",
};

const StudentsManagementPage = () => {
  return (
    <div>
      <h1>Students Management</h1>
      <p>View and manage students from your school, track their internship applications and progress.</p>
    </div>
  );
};

export default StudentsManagementPage;