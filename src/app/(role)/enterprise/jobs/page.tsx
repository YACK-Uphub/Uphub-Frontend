"use client";
import React, { useEffect } from "react";
import UJobList from "@/features/job/components/UJobList";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { setCompanyId, setSearchTerm } from "@/features/job/slices/jobSlice";
import USearch from "@/components/shared/search/USearch";

const JobListingPage = () => {
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth?.user?.userId) {
      const companyId = Number(auth.user.userId);
      console.log(companyId);
      if (!isNaN(companyId)) {
        dispatch(setCompanyId(companyId));
      } else {
        console.warn("Invalid companyId:", auth.user.userId);
      }
    }
  }, [auth?.user?.userId, dispatch]);

  const handleSearchButton = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-xl pb-6">
        <USearch onSearchSubmitAction={handleSearchButton} />
      </div>
      <UJobList />
    </div>
  );
};

export default JobListingPage;
