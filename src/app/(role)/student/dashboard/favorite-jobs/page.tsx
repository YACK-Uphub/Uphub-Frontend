import React from "react";
import type {Metadata} from "next";
import UJobList from "@/features/job/components/UJobList";

export const metadata: Metadata = {
    title: "Favorite Jobs",
    description: "View your saved internship opportunities on UpHub",
};

const FavoriteJobsPage = () => {
    return (
            <div>
                <h1 className="text-xl px-5 text-custom-blue-2">Công việc yêu thích</h1>
                <UJobList viewType="row"/>
            </div>
    );
};

export default FavoriteJobsPage;
