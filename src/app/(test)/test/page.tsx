"use client"

import USearchWithFilter, {UDropdownItem} from "@/components/shared/search/USearchWithFilter";
import {Job, JobStatus} from "@/types/job";
import UCardTopCompany from "@/components/shared/card/UCardTopCompany";
import {UCardVariant} from "@/components/shared/card/UCardVariant";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {UCardJob} from "@/components/shared/card/UCardJob";
import React from "react";
import {toast} from "react-toastify";
import {useSearchCompaniesQuery} from "@/services/companiesApi";
import {useSearchJobsQuery} from "@/services/jobsApi";
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import {Student} from "@/types/user";

const locations: UDropdownItem[] = [
  {id: 1, name: 'Hà Nội'},
  {id: 2, name: 'Hồ Chí Minh'},
]

const job: Job = {
  id: 1,
  title: "Frontend Developer",
  companyImageUrl: "https://example.com/images/techcorp-logo.png",
  companyName: "TechCorp",
  city: "San Francisco",
  description: "Join our fast-paced team building modern web applications.",
  requirements: "3+ years in React, TypeScript. Experience with TailwindCSS is a plus.",
  closingDate: "2025-07-01",
  salaryRange: "$90,000 - $120,000",
  isFeatured: true,
  isHighlighted: true,
  contactEmail: "jobs@techcorp.com",
  contactPhone: "555-123-4567",
  jobStatus: JobStatus.Open,
  companyId: 101,
  jobType: "Full-time",
  industry: "Technology",
  skills: ["React", "TypeScript", "CSS", "Git"],
  applicationCount: 42,
}

const student: Student = {
  id: 1,
  imageUrl: "https://firebasestorage.googleapis.com/v0/b/mechat-926e4.appspot.com/o/teamo%2Fimages%2Fplaceholders%2Ffemale-user.jpg?alt=media",
  firstName: "Tiểu My",
  lastName: "Lâm",
  userName: "my@test.com",
  phoneNumber: "0034988493",
  email: "my@test.com",
  biography: `Tôi có kinh nghiệm phát triển ứng dụng ASP.NET.
Tôi đã tham gia vào các dự án sử dụng .NET Core và Entity Framework.
Tôi yêu thích việc xây dựng hệ thống backend hiệu quả và có khả năng mở rộng.`,
  dateOfBirth: "2000-02-01",
  gender: "Female",
  code: "SE181549",
  industryId: 1,
  industry: "Dai Hoc FPT",
  school: "Đại học FPT",
  curriculumVitaes: [],
  socialLinks: []
};


const TestPage = () => {

  // ==== Test query =============
  // const {data, isLoading, isError} = useGetApplicationsQuery({});
  // const {data, isLoading, isError} = useGetSearchCompaniesQuery({});

  const {data: data1} = useSearchCompaniesQuery({});
  const {data: data2} = useSearchJobsQuery({});
  const {data: data3} = useSearchApplicationsQuery({});

  console.log(data1);
  console.log(data2);
  console.log(data3);

  return (
      <>
        <button onClick={() => toast("This is a test page")}>Click me</button>

        <USearchWithFilter dropdownData={locations} onSearchSubmitAction={null}></USearchWithFilter>

        <UCardTopCompany
            rating={4.7}
            followers={6968877}
            recommendationRate="74%"
            isHiring={true}
            hasHighBenefits={true}
            variant={UCardVariant.Border} companyName={""} companySize={""}/>

        <UCardApplication
            name="Lê Quang Khánh"
            role="Fullstack Developer"
            experience="7 năm"
            education="Đại học"
            submittedDate="01-03-2025"
            avatarUrl={"https://placehold.co/600x400/png"}
            cvUrl={"https://placehold.co/600x400/png"}
            variant={UCardVariant.Normal}
        />

        <UCardJob
            companyLogoUrl="https://placehold.co/600x400/png"
            companyName="Freepik"
            isFeatured={true}
            location="China"
            jobTitle="TTS Visual Designer"
            jobType="Full Time"
            salaryRange="$10K-$15K"
            variant={UCardVariant.LightBlue}/>


      </>
  )
}

export default TestPage;
