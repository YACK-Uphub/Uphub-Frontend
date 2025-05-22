import type {Metadata} from 'next';
import UUserExperienceSection from "@/features/home/components/user-experience-section/UUserExperienceSection";
import UTopCompaniesSection from "@/features/home/components/UTopCompaniesSection";
import UHeroSection from "@/features/home/components/hero-section/UHeroSection";
import UJobForUSection from "@/features/home/components/UJobForUSection";
import UJobPilotSection from "@/features/home/components/UJobPilotSection";
import UBecomeMemberSection from "@/features/home/components/become-member-section/UBecomeMemberSection";

export const metadata: Metadata = {
	title: "HomePage",
	description: "Welcome to the UpHub home page",
};

const HomePage = () => {
	return (
		<div>
			<section className={"bg-custom-yellow-3 min-h-100 pt-12 pb-12 px-12"}>
				<div className={"max-w-7xl mx-auto"}>
					<UHeroSection></UHeroSection>
				</div>
			</section>

			<section className={"min-h-100 pt-8 sm:pt-16 mx-auto max-w-7xl"}>
				<div className={"px-12 xl:px-0"}>
					<UJobForUSection></UJobForUSection>
				</div>
			</section>

			<section className={"min-h-100 pt-8 sm:pt-16 mx-auto max-w-7xl"}>
				<div className={"px-12 xl:px-0"}>
					<UTopCompaniesSection></UTopCompaniesSection>
				</div>
			</section>

			<section className={"h-full mt-8 py-8 sm:py-16 sm:mt-16 mx-auto max-w-7xl bg-custom-gray/10"}>
				<div className={"px-12 xl:px-0"}>
					<UJobPilotSection></UJobPilotSection>
				</div>
			</section>

			<section className={"min-h-100 py-8 sm:py-16 mx-auto max-w-7xl"}>
				<div className={"px-24 xl:px-0"}>
					<UUserExperienceSection></UUserExperienceSection>
				</div>
			</section>

			<section className={"mt-8 py-8 sm:py-16 sm:mt-16 mx-auto max-w-7xl bg-custom-gray/10"}>
				<div className={"px-12 xl:px-0"}>
					<UBecomeMemberSection></UBecomeMemberSection>
				</div>
			</section>
		</div>
	)
};

export default HomePage;
