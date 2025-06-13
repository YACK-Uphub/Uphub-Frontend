import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account on UpHub",
};

const RegisterPage = () => {
  return (
      <div>
        <h1>Register</h1>
        <p>Create a new account to access all features of UpHub.</p>
      </div>
  );
};

export default RegisterPage;
