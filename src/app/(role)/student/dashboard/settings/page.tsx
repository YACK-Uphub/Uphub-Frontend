import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard Settings",
  description: "Customize your student dashboard experience on UpHub",
};

const DashboardSettingsPage = () => {
  return (
    <div>
      <h1>Dashboard Settings</h1>
      <p>Customize your dashboard preferences, notification settings, and privacy options.</p>
    </div>
  );
};

export default DashboardSettingsPage;