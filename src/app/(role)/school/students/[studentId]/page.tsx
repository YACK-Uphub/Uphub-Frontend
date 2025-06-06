import React from 'react';
import type {Metadata} from 'next';
import UUserExperienceSection from "@/features/home/components/user-experience-section/UUserExperienceSection";
import UAssignJobPanel from "@/features/student/components/UAssignJobPanel";

export const metadata: Metadata = {
  title: "Students Assign Management Page",
  description: "Manage students from your school on UpHub",
};

const StudentsAssignManagementPage = () => {
  return (
      <div>
        <section className={"py-4 sm:pt-16 mx-auto max-w-7xl"}>
          <div className={"px-12 xl:px-0"}>
            <UAssignJobPanel></UAssignJobPanel>
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

export default StudentsAssignManagementPage;
