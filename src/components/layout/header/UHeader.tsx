import ULogo from "@/components/shared/ULogo";
import UNavigation from "@/components/layout/header/UNavigation";

const UHeader = () => {
	return (
		<header className={"flex justify-between items-center py-6 px-12"}>
			<ULogo></ULogo>
			<UNavigation></UNavigation>
		</header>
	);
};

export default UHeader;