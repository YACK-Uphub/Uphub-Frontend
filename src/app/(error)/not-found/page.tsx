import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist",
};

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
