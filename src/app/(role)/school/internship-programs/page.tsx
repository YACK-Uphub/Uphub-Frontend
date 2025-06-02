"use client";
import React from "react";
import UInternshipProgramList from "@/features/internship-program/components/UInternshipProgramList";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/select";
import { InternshipProgramSortType } from "@/types/internshipProgram";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { setSort } from "@/features/internship-program/slices/internshipProgramSlices";

const InternshipProgramsPage = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-custom-blue-2 text-2xl font-bold mb-5">Internship Programs</h1>
        {/* Order By */}
        <div className="flex justify-end pb-2">
          <Select onValueChange={(value) => dispatch(setSort(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={InternshipProgramSortType.endingSoon}>Sắp kết thúc</SelectItem>
                <SelectItem value={InternshipProgramSortType.upcoming}>Sắp diễn ra</SelectItem>
                <SelectItem value={null}>All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <UInternshipProgramList />
    </div>
  );
};

export default InternshipProgramsPage;
