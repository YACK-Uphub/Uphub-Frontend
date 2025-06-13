"use client";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {useSearchApplicationsQuery} from "@/services/applicationsApi";
import React, {useEffect, useState} from "react";
import {setPageIndex, setUserId} from "../slices/applicationSlice";
import {Application} from "@/types/application";
import UJobRow from "@/components/shared/table/UJobRow";
import {UPagination} from "@/components/shared/UPagination";
import {UModalWrapper} from "@/components/shared/UModalWrapper";
import UModalApplication from "./UModalApplication";

export default function UStudentApplicationList() {
  const applicationParams = useAppSelector((state) => state.applicationParams);
  const auth = useAppSelector((state) => state.auth);
  const storedUserId = useAppSelector((state) => state.applicationParams.userId);

  const {data, isLoading} = useSearchApplicationsQuery(applicationParams);
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

  // TODO: Get current user
  useEffect(() => {
    const userIdFromToken = auth?.user?.userId;
    if (userIdFromToken && !storedUserId) dispatch(setUserId(auth.user.userId));
  }, [auth?.user?.userId, storedUserId, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPageIndex(newPage));
  };

  if (isLoading) return;

  return (
      <>
        {!data ? (
            <div>empty list</div>
        ) : (
            <>
              <>
                <div className="flex flex-col w-[70vw]">
                  {data.results.map((application: Application, index) => (
                      <div key={index} onClick={() => openModal(application)} className={"cursor-pointer"}>
                        <UJobRow
                            jobTitle={application.jobTitle}
                            jobStatus={application.jobStatus}
                            imageUrl={application.companyImageUrl}
                            isApplied={true}
                            city={application.city}
                            jobType={application.jobType}
                            salaryRange={application.salaryRange}
                            applicatedDate={new Date(application.createdAt)}
                            applicationStatus={application.status}
                        />
                      </div>
                  ))}
                </div>
              </>

              {/* Pagination */}
              <UPagination
                  currentPage={Number(applicationParams.pageNumber)}
                  totalPages={data.pageCount}
                  onPageChanged={handlePageChange}
                  className="mt-5"
              />

              {/*  Open or Close the modal*/}
              {isModalOpen && selectedApplication && (
                  <UModalWrapper onCloseModal={closeModal}>
                    <UModalApplication data={selectedApplication}></UModalApplication>
                  </UModalWrapper>
              )}
            </>
        )}
      </>
  );
}
