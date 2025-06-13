"use client";

import {formatDate} from "@/utils/functionHelpers";
import UButton from "../UButton";
import Image from "next/image";

import React from "react";

import {InternshipProgram} from "@/types/internshipProgram";

interface UIntershipProgramRowProps {
  intershipProgram: InternshipProgram;
  onClickAction?: () => void;
}

export default function UInternshipProgramRow({intershipProgram, onClickAction}: UIntershipProgramRowProps) {
  return (
      <div
          className={`px-8 py-4 border-b-2 hover:bg-blue-50 grid grid-cols-7 items-center gap-4 transition-all duration-200`}
      >
        <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-md">
          <Image
              src={intershipProgram.imageUrl}
              alt="company image"
              fill={true}
              quality={50}
              loading="lazy"
              objectFit={"cover"}
              priority={false}
              placeholder={"blur"}
              blurDataURL={"/images/placeholderImage.png"}
          />
        </div>

        {/* internship program information */}
        <div className="col-span-2">
          <span className="text-lg font-bold">{intershipProgram.name}</span>
        </div>
        {/* start date */}
        <div className="col-start-4">
          <div className="my-3 flex items-center gap-2 text-sm text-custom-gray">
            <span>{formatDate(intershipProgram.startDate)}</span>
          </div>
        </div>
        {/* end date */}
        <div className="col-start-5">
          <div className="my-3 flex items-center gap-2 text-sm text-custom-gray">
            <span>{formatDate(intershipProgram.endDate)}</span>
          </div>
        </div>
        {/* Term */}
        <div className="col-start-6">
        <span className="rounded-full px-3 py-1 text-sm bg-custom-yellow-2 text-custom-blue-3">
          {intershipProgram.internshipTerm}
        </span>
        </div>
        {/* Action */}
        <div className="col-start-7">
          <UButton
              label="Chi tiết"
              backgroundColor="bg-custom-gray/10"
              textColor="text-custom-blue-2"
              onClick={onClickAction}
          />
        </div>
      </div>
  );
}
