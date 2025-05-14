import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Internship Programs",
  description: "Manage your school's internship programs on UpHub",
};

const InternshipProgramsPage = () => {
  return (
    <div>
      <h1>Internship Programs</h1>
      <p>Create, edit, and manage internship programs for your school's students.</p>
    </div>
  );
};

export default InternshipProgramsPage;