"use client"

import React from 'react';
import UUserExperienceSection from "@/features/home/components/user-experience-section/UUserExperienceSection";
import UAssignJobPanel from "@/features/student/components/UAssignJobPanel";
import UButton from "@/components/shared/UButton";
import {ArrowLeft} from "lucide-react";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {resetParams} from "@/features/internship/slices/createInternshipSlice";
import {useRouter} from "next/navigation";

const StudentsAssignManagementPage = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOnBack = () => {
    dispatch(resetParams());
    router.back();
  };

  return (
      <div>
        {/* Back Button */}
        <div className="mb-6">
          <UButton
              label="Quay lại trang học sinh"
              icon={<ArrowLeft/>}
              iconPosition="left"
              onClick={handleOnBack}
              backgroundColor="bg-custom-blue-1"
              textColor="text-custom-blue-2"
          />
        </div>

        <section className={"py-4 sm:pt-16 mx-auto max-w-7xl"}>
          <div className={"px-12 xl:px-0"}>
            <UAssignJobPanel></UAssignJobPanel>
          </div>
        </section>

        <section className={"min-h-100 py-8 sm:py-16 mx-auto max-w-7xl"}>
          <div className={"px-24 xl:px-0"}>
            <UUserExperienceSection></UUserExperienceSection>
          </div>
        </section>
      </div>
  );
};

export default StudentsAssignManagementPage;
