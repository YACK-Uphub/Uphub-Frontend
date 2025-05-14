import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Company Accounts",
  description: "Manage company accounts on UpHub",
};

const CompanyAccountsPage = () => {
  return (
    <div>
      <h1>Company Accounts</h1>
      <p>Manage company accounts and their access to UpHub.</p>
    </div>
  );
};

export default CompanyAccountsPage;