import React from 'react';
import type {Metadata} from 'next';

import USearchWithFilterWrapper from "@/components/shared/search/USearchWithFilterWrapper";
import {UDropdownItem} from "@/components/shared/search/USearchWithFilter";
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";
import {CardVariant} from "@/components/shared/card/UCardVariant";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {UCardJob} from "@/components/shared/card/UCardJob";

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

      <UCardTopCompany logoUrl="https://placehold.co/600x400/png"
                       name="NAVA Company"
                       rating={4.7}
                       employeeRange="10.000 - 100.000"
                       followers={6968877}
                       recommendationRate="74%"
                       isHiring={true}
                       hasHighBenefits={true}
                       variant={CardVariant.Border}

      />

      <UCardApplication
        name="Lê Quang Khánh"
        role="Fullstack Developer"
        experience="7 năm"
        education="Đại học"
        submittedDate="01-03-2025"
        avatarUrl={"https://placehold.co/600x400/png"}
        cvUrl={"https://placehold.co/600x400/png"}
        variant={CardVariant.Normal}
      />

      <UCardJob
        companyLogoUrl="https://placehold.co/600x400/png"
        companyName="Freepik"
        isFeatured={true}
        location="China"
        jobTitle="TTS Visual Designer"
        jobType="Full Time"
        salaryRange="$10K-$15K"
        variant={CardVariant.LightBlue}/>
    </div>
  )
};

export default AboutUsPage;
