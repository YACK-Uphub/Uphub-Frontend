import React from 'react';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about UpHub and our mission",
};

const AboutUsPage = () => {
  return (
      <>
        <h1>About Us</h1>
        <p>Learn more about UpHub, our mission, and our team.</p>
      </>
  )
};

export default AboutUsPage;
