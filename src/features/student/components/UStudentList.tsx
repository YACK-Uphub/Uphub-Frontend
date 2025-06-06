// components/UStudentList.tsx
"use client";

import React, {useState} from "react";
import {useGetAllStudentsQuery} from "@/services/studentsApi";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {UPagination} from "@/components/shared/UPagination";
import {Student} from "@/types/user";
import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import UCardStudent from "@/features/student/components/UCardStudent";
import {setPageIndex} from "@/features/student/slices/studentSlice";
import {UModalWrapper} from "@/components/shared/UModalWrapper";
import UModalStudentDetail from "@/features/student/components/UModalStudentDetail";

export type UStudentListProps = {
  isAssigningMode: boolean;
}

export const UStudentList: React.FC<UStudentListProps> = ({isAssigningMode = false}) => {

      // Local state for pagination parameters
      const studentParams = useAppSelector(state => state.studentParams)

      // Fetch paginated students; backend returns PaginatedResponse<Student>
      const {data, isLoading, isFetching} = useGetAllStudentsQuery(studentParams);
      const dispatch = useAppDispatch();

      // Local state for the detail modal
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedStudentId, setselectedStudentId] = useState<number | null>(null);

      const openModal = (studentId: number) => {
        setIsModalOpen(true);
        setselectedStudentId(studentId);
      };

      const closeModal = () => {
        setIsModalOpen(false);
        setselectedStudentId(null);
      };

      // Show spinner while loading or refetching
      if (isLoading || isFetching) {
        return <UPageSpinner/>;
      }

      let totalPages = Math.ceil(data.count / data.pageSize);

      // Handle page change from UPagination (1-based)
      const handlePageChange = (newPage: number) => {
        dispatch(setPageIndex(newPage));
      };

      return (
          <>
            {/* Header: total count of students */}
            <h1 className="text-xl font-semibold">
              Tổng số sinh viên ({data.count})
            </h1>

            {/* Grid of student cards */}
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {data.data.map((student: Student) => (
                  <div
                      key={student.id}
                      onClick={() => openModal(student.id)}
                      className="cursor-pointer"
                  >
                    <UCardStudent student={student}
                                  isStudentAssignMode={isAssigningMode}/>
                  </div>
              ))}
            </div>

            {/* Pagination component */}
            {totalPages > 1 && (
                <UPagination
                    currentPage={Number(studentParams.pageIndex)}
                    totalPages={totalPages}
                    onPageChanged={handlePageChange}
                    className="mt-8"
                />
            )}

            {/*Modal for showing student details*/}
            {isModalOpen && selectedStudentId && (
                <UModalWrapper onCloseModal={closeModal}>
                  <UModalStudentDetail studentId={selectedStudentId}/>
                </UModalWrapper>
            )}
          </>
      );
    }
;

export default UStudentList;


