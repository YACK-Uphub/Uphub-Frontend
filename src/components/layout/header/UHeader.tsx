import ULogo from "@/components/shared/ULogo";
import UHeaderNavigation from "@/components/layout/header/UHeaderNavigation";

const UHeader = () => {
  return (
      <div className={"flex justify-between items-center flex-col gap-2 sm:flex-row"}>
        <ULogo></ULogo>
        <UHeaderNavigation></UHeaderNavigation>
      </div>
  );
};

export default UHeader;
