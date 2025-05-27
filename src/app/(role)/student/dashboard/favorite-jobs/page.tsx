import React from "react";
import type { Metadata } from "next";
import UJobList from "@/features/job/components/UJobList";

export const metadata: Metadata = {
    title: "Favorite Jobs",
    description: "View your saved internship opportunities on UpHub",
};

const FavoriteJobsPage = () => {
    return (
        <div>
            <UJobList viewType="row" />
        </div>
    );
};

export default FavoriteJobsPage;
