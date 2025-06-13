"use client"

import React from 'react';
import UBecomeMemberCard from "@/features/home/components/become-member-section/UBecomeMemberCard";

const UBecomeMemberSection = () => {

  const onNavigatingTo = () => {
    alert("Signup is already registered");
  }

  return (
      <div className={"flex flex-col items-stretch sm:flex-row gap-8 sm:gap-16"}>
        <div className={"flex-1"}>
          <UBecomeMemberCard onClickSignup={onNavigatingTo}
                             isMemberSignup={true}/>
        </div>

        <div className={"flex-1"}>
          <UBecomeMemberCard onClickSignup={onNavigatingTo}
                             isMemberSignup={false}/>
        </div>
      </div>
  );
};

export default UBecomeMemberSection;
