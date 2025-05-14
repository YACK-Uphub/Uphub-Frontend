import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Server Error",
  description: "An unexpected server error occurred",
};

const ServerErrorPage = () => {
  return (
    <div>
      <h1>500 - Server Error</h1>
      <p>An unexpected error occurred on our servers. Please try again later.</p>
    </div>
  );
};

export default ServerErrorPage;
