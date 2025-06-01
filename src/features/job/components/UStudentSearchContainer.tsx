"use client";
import USearchWithFilter, { USearchWithFilterParams } from "@/components/shared/search/USearchWithFilter";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { setSearchTerm } from "../slices/jobSlice";
import { City } from "@/types/city";
import { useGetAllCitiesQuery } from "@/services/citiesApi";
import { SearchPaginatedRequestParams } from "@/types/baseModel";

export default function UStudentSearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [params, setParams] = useState<SearchPaginatedRequestParams>();
  const { data: cities } = useGetAllCitiesQuery(params);
  //const dropdownData = cities.data.map((city) => ({ id: city.id, name: city.name }));

  const handleSearchButton = ({ searchKeyword, dropdownItemId, extraSelectionIds }: USearchWithFilterParams) => {
    if (pathname !== "/student/jobs/") router.push("/student/jobs/");
    dispatch(setSearchTerm(searchKeyword));
  };
  return (
    <div className="sticky top-0 bottom-0 left-0 z-10 flex w-full justify-center bg-gray-100 py-5">
      <div className="mx-auto w-full max-w-5xl">
        <USearchWithFilter dropdownData={cities?.data} onSearchSubmit={handleSearchButton} />
      </div>
    </div>
  );
}
