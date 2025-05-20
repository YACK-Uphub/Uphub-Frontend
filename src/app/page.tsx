import type {Metadata} from 'next';
import UHeroSection from "@/features/home/hero-section/UHeroSection";
import UJobForUSection from "@/features/home/job-for-u-section/UJobForUSection";
import UTopCompaniesSection from "@/features/home/top-companies-section/UTopCompaniesSection";
import UJobPilotSection from "@/features/home/jobpilot-section/UJobPilotSection";
import UUserExperienceSection from "@/features/home/user-experience-section/UUserExperienceSection";
import UBecomeMemberSection from "@/features/home/become-member-section/UBecomeMemberSection";

export const metadata: Metadata = {
  title: "HomePage",
  description: "Welcome to the UpHub home page",
};

const HomePage = () => {
  return (
    <div className={"flex flex-col"}>

      <section className={"bg-custom-yellow-3 max-w-full min-h-100 "}>
        <UHeroSection></UHeroSection>
      </section>

      <section className={"min-h-100"}>
        <UJobForUSection></UJobForUSection>
      </section>

      <section className={"min-h-100"}>
        <UTopCompaniesSection></UTopCompaniesSection>
      </section>

      <section className={"min-h-100 bg-custom-gray/10"}>
        <UJobPilotSection></UJobPilotSection>
      </section>

      <section className={"min-h-100 bg-custom-gray/10"}>
        <UUserExperienceSection></UUserExperienceSection>
      </section>

      <section className={"min-h-100"}>
        <UBecomeMemberSection></UBecomeMemberSection>
      </section>
    </div>
  )
};

export default HomePage;
