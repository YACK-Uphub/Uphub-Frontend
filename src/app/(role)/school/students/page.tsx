import React from 'react';
import type {Metadata} from 'next';
import UStudentList from "@/features/student/components/UStudentList";
import UUserExperienceSection from "@/features/home/components/user-experience-section/UUserExperienceSection";

export const metadata: Metadata = {
  title: "Students Management",
  description: "Manage students from your school on UpHub",
};
const StudentsManagementPage = () => {
  return (
      <div>
        <section className={"pt-8 sm:pt-16 max-w-7xl"}>
          <div className={"px-12 xl:px-0"}>
            <UStudentList isAssigningMode={true}></UStudentList>
          </div>
        </section>

        <section className={"min-h-100 py-8 sm:py-16 mx-auto max-w-7xl"}>
          <div className={"px-24 xl:px-0"}>
            <UUserExperienceSection></UUserExperienceSection>
          </div>
        </section>
      </div>
  );
};

export default StudentsManagementPage;
