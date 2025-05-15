import ULogo from "@/components/shared/ULogo";
import UHeaderNavigation from "@/components/layout/header/UHeaderNavigation";

const UHeader = () => {
	return (
		<header className={"flex justify-between items-center"}>
			<ULogo></ULogo>
			<UHeaderNavigation></UHeaderNavigation>
		</header>
	);
};

export default UHeader;