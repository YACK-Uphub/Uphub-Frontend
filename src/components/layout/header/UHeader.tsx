import ULogo from "@/components/shared/ULogo";
import UHeaderNavigation from "@/components/layout/header/UHeaderNavigation";

const UHeader = () => {
	return (
		<div className={"flex justify-between items-center"}>
			<ULogo></ULogo>
			<UHeaderNavigation></UHeaderNavigation>
		</div>
	);
};

export default UHeader;