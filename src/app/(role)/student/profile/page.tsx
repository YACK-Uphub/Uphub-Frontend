import React from "react";
import type {Metadata} from "next";
import UProfile from "@/features/profile/components/UProfile";

export const metadata: Metadata = {
    title: "Student Profile",
    description: "Manage your personal information and resume on UpHub",
};

const ProfilePage = () => {
    return (
            <div>
                <UProfile/>
            </div>
    );
};

export default ProfilePage;
