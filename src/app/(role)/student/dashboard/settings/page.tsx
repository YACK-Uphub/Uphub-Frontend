import React from "react";
import UProfile from "@/features/profile/components/UProfile";

export const metadata: Metadata = {
  title: "Dashboard Settings",
  description: "Customize your student dashboard experience on UpHub",
};

const DashboardSettingsPage = () => {
    return (
            <div>
                <UProfile/>
            </div>
    );
};

export default DashboardSettingsPage;
