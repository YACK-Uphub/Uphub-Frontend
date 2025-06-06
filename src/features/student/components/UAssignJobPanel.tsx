// components/UAssignJobPage.tsx
"use client";

import React, {useState} from "react";
import {useParams} from "next/navigation";
import {useGetStudentByIdQuery} from "@/services/studentsApi";
import {useSearchJobsQuery} from "@/services/jobsApi";

import {useAppDispatch, useAppSelector} from "@/libs/rtk/hooks";
import {setPageIndex as setJobPageIndex} from "@/features/job/slices/jobSlice";
import {setPageIndex as setProgramPageIndex} from "@/features/internship-program/slices/internshipProgramSlice";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";
import {AcademicCapIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {UPagination} from "@/components/shared/UPagination";
import {useSearchInternshipProgramsQuery} from "@/services/internshipProgramsApi";
import UButton from "@/components/shared/UButton";
import {useCreateInternshipMutation} from "@/services/internshipsApi";
import {
  resetParams,
  setInternshipProgramId,
  setJobId,
  setUserId
} from "@/features/internship/slices/createInternshipSlice";
import {toast} from "react-toastify";

const UAssignJobPanel: React.FC = () => {
  const params = useParams<{ studentId: string }>();
  const studentId = Number(params.studentId);
  const dispatch = useAppDispatch();

  // ============================
  // Fetch student details
  // ============================
  const {
    data: student,
    isLoading: isStudentLoading,
  } = useGetStudentByIdQuery(studentId);

  React.useEffect(() => {
    if (student) {
      dispatch(setUserId(student.id));
    }
  }, [student, dispatch]);

  // ============================
  // Jobs pagination & list
  // ============================
  const jobParams = useAppSelector((state) => state.jobParams);
  const {data: jobs, isLoading: isJobsLoading} = useSearchJobsQuery(jobParams);
  const handleJobsPageChange = (newPage: number) => {
    dispatch(setJobPageIndex(newPage));
  };

  // =======================================
  // Internship programs pagination & list
  // =======================================
  const programParams = useAppSelector(
      (state) => state.internshipProgramParams
  );
  const {data: programs, isLoading: isProgramsLoading} = useSearchInternshipProgramsQuery(programParams);
  const handleProgramsPageChange = (newPage: number) => {
    dispatch(setProgramPageIndex(newPage));
  };

  // =======================================
  // Selected IDs
  // =======================================

  const createInternshipParams = useAppSelector(state => state.createInternshipParams)
  const [createInternship, {isLoading: isLoadingCreatingInternship}] = useCreateInternshipMutation();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (isStudentLoading || isJobsLoading || isProgramsLoading || isLoadingCreatingInternship) {
    return <UPageSpinner/>;
  }

  // Guard: if student is not found
  if (!student) {
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <p className="text-center text-red-500">
            Sinh viên với ID={studentId} không tồn tại.
          </p>
        </div>
    );
  }

  // Submit assigning job to student
  const handleSubmit = async () => {
    try {
      const response = await createInternship(createInternshipParams).unwrap();

      console.log(response);

      toast.success("Chỉ định sinh viên thành công!");
      dispatch(resetParams());
    } catch (err: any) {
      toast.error(
          err?.data?.message || "Không thể chỉ định sinh viên. Vui lòng thử lại."
      );
    }
  };

  return (
      <div className="mt-10 flex flex-col
      bg-white rounded-lg shadow-2xl overflow-hidden md:flex-row">

        {/* LEFT COLUMN: Show All Student Info */}
        <div className="w-full border-b border-gray-200 bg-gradient-to-b from-white
        to-gray-50 p-6 md:w-2/7 md:border-r md:border-b-0">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with colored ring */}
            {student.imageUrl ? (
                <div className="relative">
                  <img
                      src={student.imageUrl}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="w-32 h-32 rounded-full object-cover shadow-lg ring-4 ring-blue-300"
                  />
                </div>
            ) : (
                <div
                    className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-300">
                  <UserCircleIcon className="h-12 w-12 text-gray-500"/>
                </div>
            )}

            {/* Name & codes */}
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {student.firstName} {student.lastName}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Mã SV: {student.code}</p>
            <p className="mt-1 text-sm text-gray-500">Username: {student.userName}</p>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-gray-200"/>

            {/* Grid of Key Stats */}
            <div className="grid grid-cols-1 gap-4 text-left">
              {/* Email */}
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-blue-700">Email</h3>
                <p className="mt-1 text-gray-800 truncate">{student.email}</p>
              </div>

              {/* Phone */}
              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-purple-700">Số điện thoại</h3>
                <p className="mt-1 text-gray-800 truncate">{student.phoneNumber}</p>
              </div>

              {/* Gender & DOB */}
              <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-green-700">Giới tính</h3>
                <p className="mt-1 text-gray-800">{student.gender}</p>
                <h3 className="mt-2 text-xs font-semibold text-green-700">Ngày sinh</h3>
                <p className="mt-1 text-gray-800">{student.dateOfBirth}</p>
              </div>

              {/* School & Industry */}
              <div className="rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-yellow-700">
                  Trường (ID {student.schoolId})
                </h3>
                <p className="mt-1 text-gray-800 truncate">{student.school}</p>
                <h3 className="mt-2 text-xs font-semibold text-yellow-700">
                  Ngành (ID {student.industryId})
                </h3>
                <p className="mt-1 text-gray-800 truncate">{student.industry}</p>
              </div>

              {/* Internship Info */}
              <div className="rounded-lg bg-gradient-to-r from-pink-50 to-pink-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-pink-700">Internship ID</h3>
                <p className="mt-1 text-gray-800">{student.internshipId}</p>
                <h3 className="mt-2 text-xs font-semibold text-pink-700">Status</h3>
                <p className="mt-1 text-gray-800">{student.internshipStatus}</p>
              </div>

              {/* Job Info */}
              <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 px-4 py-3 shadow-sm">
                <h3 className="text-xs font-semibold text-indigo-700">Job ID & Title</h3>
                <p className="mt-1 text-gray-800 truncate">
                  {student.jobId} – {student.jobTitle}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-gray-200"/>
          </div>
        </div>

        {/* MIDDLE COLUMN: Show All Student Info Next */}
        <div className="w-full border-b border-gray-200 bg-gradient-to-b from-white
        to-gray-50 p-6 md:w-3/7 md:border-r md:border-b-0">
          {/* Biography */}
          <div className="w-full text-left">
            <h3 className="text-sm font-semibold text-gray-700">Tiểu sử</h3>
            <p className="mt-2 whitespace-pre-line text-gray-800">
              {student.biography}
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gray-200"/>

          {/* Skills */}
          <div className="w-full text-left">
            <h3 className="text-sm font-semibold text-gray-700">Kỹ năng</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {student.skills.map((skill) => (
                  <span
                      key={skill.id}
                      className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium"
                  >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gray-200"/>

          {/* CV Links */}
          <div className="w-full text-left">
            <h3 className="text-sm font-semibold text-gray-700">CV Documents</h3>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {student.curriculumVitaes.map((cv) => (
                  <li key={cv.id}>
                    <a
                        href={cv.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                    >
                      View CV #{cv.id}
                    </a>
                  </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gray-200"/>

          {/* Social Links */}
          <div className="w-full text-left">
            <h3 className="text-sm font-semibold text-gray-700">Mạng Xã Hội</h3>
            <ul className="mt-2 flex flex-col gap-1">
              {student.socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                        href={link.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                    >
                      <span>{link.name}:</span>
                      <span className="break-all">{link.linkUrl}</span>
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Job & Program Selection Panels */}
        <div className="w-full p-6 md:w-2/7">
          <div className="space-y-8">
            {/* Job Selection Panel */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Chọn Công việc
              </h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <ul className="max-h-56 overflow-y-auto">
                  {jobs?.results.map((job) => (
                      <li
                          key={job.id}
                          onClick={() => dispatch(setJobId(job.id))}
                          className={`
                      flex items-center justify-between px-4 py-2 cursor-pointer transition-colors duration-150
                      ${createInternshipParams.jobId === job.id
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "hover:bg-gray-50 text-gray-800"
                          }
                    `}
                      >
                        <span>{job.title}</span>
                        {createInternshipParams.jobId === job.id && (
                            <span className="text-blue-600 font-semibold">✓</span>
                        )}
                      </li>
                  ))}
                </ul>
              </div>
              {jobs && jobs.pageCount > 1 && (
                  <div className="mt-3 flex justify-center">
                    <UPagination
                        currentPage={Number(jobParams.pageNumber)}
                        totalPages={jobs.pageCount}
                        onPageChanged={handleJobsPageChange}
                        className="mt-2"
                    />
                  </div>
              )}
            </div>

            {/* Internship Program Selection Panel */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Chọn Chương trình Thực tập
              </h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <ul className="max-h-56 overflow-y-auto">
                  {programs?.results.map((prog) => (
                      <li
                          key={prog.id}
                          onClick={() => dispatch(setInternshipProgramId(prog.id))}
                          className={`
                      flex items-center justify-between px-4 py-2 cursor-pointer transition-colors duration-150
                      ${createInternshipParams.internshipProgramId === prog.id
                              ? "bg-green-100 text-green-700 font-medium"
                              : "hover:bg-gray-50 text-gray-800"
                          }
                    `}
                      >
                        <span>{prog.name}</span>
                        {createInternshipParams.internshipProgramId === prog.id && (
                            <span className="text-green-600 font-semibold">✓</span>
                        )}
                      </li>
                  ))}
                </ul>
              </div>
              {programs && programs.pageCount > 1 && (
                  <div className="mt-3 flex justify-center">
                    <UPagination
                        currentPage={Number(programParams.pageNumber)}
                        totalPages={programs.pageCount}
                        onPageChanged={handleProgramsPageChange}
                        className="mt-2"
                    />
                  </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <UButton
                onClick={handleSubmit}
                label={isSubmitting ? "Đang gửi..." : "Chỉ định"}
                backgroundColor="bg-custom-blue-3"
                textColor="text-white"
                border="border border-transparent"
                icon={<AcademicCapIcon className="h-6 w-6 text-custom-white"/>}
                iconPosition={"left"}
                isSubmitFormButton={false}
            />

          </div>
        </div>
      </div>
  );
};

export default UAssignJobPanel;
