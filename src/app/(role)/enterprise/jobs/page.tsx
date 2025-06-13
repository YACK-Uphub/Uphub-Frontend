"use client";
import React, {useEffect} from "react";
import UJobList from "@/features/job/components/UJobList";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {setCompanyId, setSearchTerm} from "@/features/job/slices/jobSlice";
import USearch from "@/components/shared/search/USearch";
import {BriefcaseIcon} from "lucide-react";
import UButton from "@/components/shared/UButton";

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
      <div className="pb-10">
        {/* Header */}
        <section className={"border-b-2 py-4 px-12 xl:px-0"}>
          <div className={"mx-auto max-w-7xl"}>
            <div className={"flex items-center justify-between"}>
              <div className={"flex gap-2"}>
                <BriefcaseIcon height={24} width={24} className={"text-custom-blue-2"}></BriefcaseIcon>
                <h1 className={"text-shadow-md"}>{auth?.user?.username}</h1>
              </div>

              <UButton
                  label={"Đăng tuyển việc làm"}
                  backgroundColor={"bg-custom-white"}
                  textColor={"text-custom-blue-2"}
                  borderRadius={"rounded-sm"}
                  border={"border border-2 border-custom-blue-2"}
                  onClick={null}
              />
            </div>
          </div>
        </section>
        <div className="mx-auto w-full max-w-xl py-6">
          <USearch onSearchSubmitAction={handleSearchButton}/>
        </div>
        <UJobList/>
      </div>
  );
};

export default JobListingPage;
