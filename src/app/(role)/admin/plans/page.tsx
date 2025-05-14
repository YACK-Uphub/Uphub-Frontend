import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Subscription Plans",
  description: "Manage subscription plans on UpHub",
};

const SubscriptionPlansPage = () => {
  return (
    <div>
      <h1>Subscription Plans</h1>
      <p>Manage subscription plans and pricing for UpHub users.</p>
    </div>
  );
};

export default SubscriptionPlansPage;