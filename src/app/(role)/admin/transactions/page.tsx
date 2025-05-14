import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Transactions",
  description: "View and manage financial transactions on UpHub",
};

const TransactionsPage = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <p>View and manage financial transactions and payment history on UpHub.</p>
    </div>
  );
};

export default TransactionsPage;