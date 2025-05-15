import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "UpHub administration dashboard",
};

const AdminDashboardPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the UpHub administration dashboard.</p>
    </div>
  );
};

export default AdminDashboardPage;
