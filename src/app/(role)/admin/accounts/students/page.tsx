import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Student Accounts",
  description: "Manage student accounts on UpHub",
};

const StudentAccountsPage = () => {
  return (
    <div>
      <h1>Student Accounts</h1>
      <p>Manage student accounts and their access to UpHub.</p>
    </div>
  );
};

export default StudentAccountsPage;