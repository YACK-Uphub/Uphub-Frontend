import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Applications",
  description: "Track your internship applications on UpHub",
};

const MyApplicationsPage = () => {
  return (
    <div>
      <h1>My Applications</h1>
      <p>View and track the status of all your internship applications.</p>
    </div>
  );
};

export default MyApplicationsPage;