import ULogo from "@/components/shared/ULogo";
import UNavigation from "@/components/layout/header/UNavigation";

const UHeader = () => {
	return (
		<header className={"flex justify-between items-center"}>
			<ULogo></ULogo>
			<UNavigation></UNavigation>
		</header>
	);
};

export default UHeader;