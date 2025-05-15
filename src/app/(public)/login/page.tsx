import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your UpHub account",
};

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Sign in to access your UpHub account.</p>
    </div>
  );
};

export default LoginPage;
