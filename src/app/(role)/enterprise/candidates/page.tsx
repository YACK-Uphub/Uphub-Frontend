import React from "react";
import type {Metadata} from "next";
import UUserExperienceSection from "@/features/home/components/user-experience-section/UUserExperienceSection";
import UStudentList from "@/features/student/components/UStudentList";

export const metadata: Metadata = {
  title: "Candidates",
  description: "Browse potential candidates for your internship positions on UpHub",
};

const CandidatesPage = () => {
  return (
    <div>
      <section className={"min-h-100 mx-auto max-w-5xl"}>
        <div className={"px-12 xl:px-0"}>
          <UStudentList isAssigningMode={false}></UStudentList>
        </div>
      </section>

      <section className={"min-h-100 py-8 sm:py-16 mx-auto max-w-5xl"}>
        <div className={"px-24 xl:px-0"}>
          <UUserExperienceSection></UUserExperienceSection>
        </div>
      </section>
    </div>
  );
};

export default CandidatesPage;
