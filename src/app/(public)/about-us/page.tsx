import React from 'react';
import type {Metadata} from 'next';

import USearchWithFilterWrapper from "@/components/shared/search/USearchWithFilterWrapper";
import {UDropdownItem} from "@/components/shared/search/USearchWithFilter";
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";

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

      <UCardTopCompany logoUrl="/company-logo.png"
                       name="NAVA Company"
                       rating={4.7}
                       employeeRange="10.000 - 100.000"
                       followers={6968877}
                       recommendationRate="74%"
                       isHiring={true}
                       hasHighBenefits={true}/>
    </div>
  )
};

export default AboutUsPage;
