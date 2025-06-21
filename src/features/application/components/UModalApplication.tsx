"use client";
// @flow
import * as React from "react";
import { Application, ApplicationStatus } from "@/types/application";
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  FlagIcon,
  LinkIcon as ExternalLinkIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import UButton from "@/components/shared/UButton";
import { getStyleApplicationStatus } from "@/components/shared/table/URowVariant";
import { useGetApplicationByIdQuery, useUpdateApplicationMutation } from "@/services/applicationsApi";
import { toast } from "react-toastify";
import { UPageSpinner } from "@/components/shared/spinner/UPageSpinner";
import { auth } from "@/auth";
import { useAppSelector } from "@/libs/rtk/hooks";
import { UserRole } from "@/types/user";

export type UModalApplicationProps = {
  data: Application;
};

export default function UModalApplication({ data }: UModalApplicationProps) {
  const [updateApplication] = useUpdateApplicationMutation();
  const { data: application, isLoading } = useGetApplicationByIdQuery(data.id);
  const auth = useAppSelector((state) => state.auth);

  const handleSubmit = async (status: ApplicationStatus) => {
    try {
      await updateApplication({ id: data.id, body: { status: status } }).unwrap();
      toast.success("Xử lý đơn thành công");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  if (isLoading || !application) return <UPageSpinner />;

  return (
    <div className="mx-auto flex flex-col gap-8 md:flex-row">
      {/* LEFT: Profile Info */}
      <div className="flex-1">
        {/* Header */}
        <div className="border-b pb-4 border-custom-gray/30">
          <h2 className="text-2xl font-bold text-custom-black">{data.fullName}</h2>
          <p className="border-custom-gray/90">{data.jobTitle}</p>
        </div>

        {/* About Section */}
        <div className="mt-6 border-b pb-6 border-custom-gray/30">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold uppercase text-custom-blue-3">
            <UserIcon className="h-5 w-5 text-custom-blue-3" />
            GIỚI THIỆU BẢN THÂN
          </h3>
          <p className="whitespace-pre-line text-custom-gray/70">
            {data.introduction || "Không có thông tin giới" + " thiệu"}
          </p>
        </div>

        {/* Cover Letter Section */}
        <div className="mt-6 pb-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold uppercase text-custom-blue-3">
            <DocumentTextIcon className="h-5 w-5 text-custom-blue-3" />
            THƯ XIN VIỆC
          </h3>
          <p className="whitespace-pre-line text-custom-gray/70">
            {data.coverLetter || "Không" + " có thư" + " xin việc"}
          </p>
        </div>
      </div>

      {/* RIGHT: Info Cards */}
      <div className="w-full space-y-4 md:w-80">
        {/* Job Info Card */}
        <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
            <BriefcaseIcon className="h-5 w-5" />
            THÔNG TIN CÔNG VIỆC
          </h4>
          <div className="text-sm text-gray-600 space-y-3">
            <div className="flex items-start gap-3">
              <BuildingOfficeIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Công ty: </strong> {data.salaryRange || "Không xác định"}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Địa điểm: </strong> {data.city || "Không xác định"}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CurrencyDollarIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Mức lương: </strong> {data.salaryRange || "Thương lượng"}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Loại hình: </strong> {data.jobType || "Toàn thời gian"}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
            <EnvelopeIcon className="h-5 w-5" />
            THÔNG TIN LIÊN HỆ
          </h4>
          <div className="text-sm text-gray-600 space-y-3">
            <div className="flex items-start gap-3">
              <EnvelopeIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Email:</strong> {data.email || "Không có"}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <PhoneIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div className={"flex items-center gap-3"}>
                <strong className="text-gray-700">Điện thoại:</strong> {data.phone || "Không có"}
              </div>
            </div>

            <div
              className={
                "flex flex-col gap-4 " + "sm:flex-row sm:items-center sm:justify-end " + "md:flex-col md:items-stretch"
              }
            >
              {/* LinkedIn Button */}
              {data.linkedInUrl && (
                <UButton
                  onClick={() => window.open(data.linkedInUrl, "_blank")}
                  label="Linkedin"
                  backgroundColor="bg-custom-blue-2/10"
                  textColor="text-custom-blue-2"
                  border="border border-transparent"
                  icon={<ExternalLinkIcon className="h-4 w-4" />}
                  iconPosition="left"
                  width="w-full sm:w-auto"
                />
              )}

              {/* CV Download Button */}
              {data.cvUrl && (
                <UButton
                  onClick={() => window.open(data.cvUrl, "_blank")}
                  label="Tải CV"
                  backgroundColor="bg-green-600/10"
                  textColor="text-green-600"
                  border="border border-transparent"
                  icon={<DocumentTextIcon className="h-4 w-4" />}
                  iconPosition="left"
                  width="w-full sm:w-auto"
                />
              )}
            </div>
          </div>
        </div>

        {/* Status Info Card */}
        <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
            <FlagIcon className="h-5 w-5" />
            TRẠNG THÁI ỨNG TUYỂN
          </h4>
          <div className={`flex items-center gap-3`}>
            <span>Trạng thái:</span>
            <span
              className={`p-2 rounded-md shadow-sm ${getStyleApplicationStatus(application.status).text} ${
                getStyleApplicationStatus(application.status).bg
              }`}
            >
              {application.status || "Đang xử lý"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ClockIcon className="h-4 w-4 flex-shrink-0" />
          <div className={"flex items-center gap-3"}>
            <span className="text-custom-gray">Cập nhật:</span> {new Date().toLocaleDateString()}
          </div>
        </div>

        {auth?.user?.role?.startsWith("Company") && application.status === ApplicationStatus.Applied && (
          <div className="flex gap-2">
            <UButton
              label="Duyệt đơn"
              backgroundColor="bg-custom-blue-2"
              onClick={() => handleSubmit(ApplicationStatus.Hired)}
            />
            <UButton
              label="Từ chối"
              backgroundColor="bg-gray-100"
              textColor="text-custom-blue-2"
              onClick={() => handleSubmit(ApplicationStatus.Rejected)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
