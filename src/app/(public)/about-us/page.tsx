import React from 'react';
import type {Metadata} from 'next';

import USearchWithFilterWrapper from "@/components/shared/search/USearchWithFilterWrapper";
import {UDropdownItem} from "@/components/shared/search/USearchWithFilter";

const locations: UDropdownItem[] = [
  {id: 1, name: 'Hà Nội'},
  {id: 2, name: 'Hồ Chí Minh'},
]

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about UpHub and our mission",
};

const AboutUsPage = async () => {

  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about UpHub, our mission, and our team.</p>
      <USearchWithFilterWrapper dropdownData={locations}></USearchWithFilterWrapper>
    </div>
  )
};

export default AboutUsPage;
