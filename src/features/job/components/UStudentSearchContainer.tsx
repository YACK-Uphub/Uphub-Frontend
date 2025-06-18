"use client";
import USearchWithFilter, {USearchWithFilterParams} from "@/components/shared/search/USearchWithFilter";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {usePathname, useRouter} from "next/navigation";
import React from "react";
import {setCityId, setSearchTerm} from "../slices/jobSlice";
import {useGetAllCitiesQuery} from "@/services/citiesApi";

export default function UStudentSearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const {data: cities} = useGetAllCitiesQuery(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearchButton = ({searchKeyword, dropdownItemId, extraSelectionIds}: USearchWithFilterParams) => {
    if (pathname !== "/student/jobs/") router.push("/student/jobs/");
    dispatch(setSearchTerm(searchKeyword));
    dispatch(setCityId(dropdownItemId ?? ""));
  };
  return (
      <div className="sticky top-0 bottom-0 left-0 z-10 flex w-full justify-center bg-gray-100 py-5">
        <div className="mx-auto w-full max-w-5xl">
          <USearchWithFilter dropdownData={cities} onSearchSubmitAction={handleSearchButton}/>
        </div>
      </div>
  );
}
