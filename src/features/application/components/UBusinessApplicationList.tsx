"use client";

import * as React from "react";
import {useState} from "react";
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import UCardApplication from "@/components/shared/card/UCardApplication";
import {formatDate} from "@/utils/functionHelpers";
import {UCardVariant} from "@/components/shared/card/UCardVariant";

import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {setPageIndex} from "@/features/application/slices/applicationSlice";
import {UPagination} from "@/components/shared/UPagination";
import {Application} from "@/types/application";
import {UModalWrapper} from "@/components/shared/UModalWrapper";
import UModalApplication from "@/features/application/components/UModalApplication";

export const UBusinessApplicationList = () => {
  const applicationParams = useAppSelector((state) => state.applicationParams);
  const {data, isLoading, isFetching} = useSearchApplicationsQuery({...applicationParams});
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application>(null);

  const openModal = (application) => {
    setIsModalOpen(true);
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  if (isLoading || isFetching) {
    return <UPageSpinner></UPageSpinner>;
  }

  const handlePageChange = (newPage: number) => {
    dispatch(setPageIndex(newPage));
  };

  return (
      <>
        {/* List */}
        <h1>Tổng đơn ứng tuyển ({data.totalCount})</h1>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {data?.results?.length > 0 &&
              data.results.map((item, index) => (
                  <div key={index} onClick={() => openModal(item)} className={"cursor-pointer"}>
                    <UCardApplication
                        key={index}
                        avatarUrl={item.imageUrl}
                        name={item.fullName}
                        role={item.jobTitle}
                        experience={"7"}
                        education={"Đại học"}
                        submittedDate={formatDate(item.createdAt)}
                        variant={UCardVariant.Normal}
                    />
                  </div>
              ))}
        </div>

        {/* Pagination */}
        {data?.pageCount > 1 && (
            <UPagination
                currentPage={Number(applicationParams.pageNumber)}
                totalPages={data.pageCount}
                onPageChanged={handlePageChange}
                className="mt-5"
            />
        )}

        {/*  Open or Close the modal*/}
        {isModalOpen && selectedApplication && (
            <UModalWrapper onCloseModal={closeModal}>
              <UModalApplication data={selectedApplication}></UModalApplication>
            </UModalWrapper>
        )}
      </>
  );
};
