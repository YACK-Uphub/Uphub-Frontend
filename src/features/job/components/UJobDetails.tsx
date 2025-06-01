"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Briefcase, Calendar, Clock, Facebook, Mail, Phone, Twitter, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/shadcn/button";
import { formatDate, formatNewLine } from "@/utils/helpers";
import Image from "next/image";
import UCompanyInfoCard from "./UCompanyInfoCard";
import UJobList from "./UJobList";
import { resetParams, setPageSize } from "../slices/jobSlice";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { useGetJobByIdQuery } from "@/services/jobsApi";
import { useGetCompanyByIdQuery } from "@/services/companiesApi";
import { skipToken } from "@reduxjs/toolkit/query";
import UButton from "@/components/shared/UButton";
import { useRouter } from "next/navigation";
import { UModalWrapper } from "@/components/shared/UModalWrapper";
import { UModalApplyingJob } from "@/features/job/components/UModalApplyingJob";

const UJobDetails = ({ id }: { id: number }) => {
  const { data: job, isLoading } = useGetJobByIdQuery(id);
  const { data: company } = useGetCompanyByIdQuery(job?.companyId ?? skipToken);

  const [imageUrl, setImageUrl] = useState<string | undefined>("https://placehold.co/600x400/png");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && job?.companyId) {
      dispatch(setPageSize(6));
    }
  }, [dispatch, job]);

  useEffect(() => {
    if (company?.imageUrl) {
      setImageUrl(company.imageUrl);
    }
  }, [company]);

  const handleOnBack = () => {
    dispatch(resetParams());
    router.back();
  };

  if (isLoading) return;

  return (
    <>
      {/*  Open or Close the application form modal*/}
      {isModalOpen && job && (
        <UModalWrapper
          onCloseModal={() => {
            setIsModalOpen(false);
          }}
        >
          <UModalApplyingJob job={job} company={company}></UModalApplyingJob>
        </UModalWrapper>
      )}

      {/* Job Details */}
      <div className="mx-auto min-h-screen max-w-6xl bg-gray-50 p-5">
        <UButton
          label=""
          icon={<ArrowLeft />}
          iconPosition="left"
          onClick={handleOnBack}
          backgroundColor="bg-custom-blue-1"
          textColor="text-custom-blue-2"
        />
        {/* Header */}
        <div className="my-4 rounded-lg bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full">
                <Image
                  src={imageUrl}
                  alt="company image"
                  quality={50}
                  loading="lazy"
                  fill
                  objectFit={"cover"}
                  priority={false}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-custom-black">{job.title}</h1>
                <div className="mt-1 flex items-center text-sm space-x-4 text-custom-gray">
                  <span className="flex items-center">
                    <Phone className="mr-1 h-4 w-4" />
                    {job.contactPhone}
                  </span>
                  <span className="flex items-center">
                    <Mail className="mr-1 h-4 w-4" />
                    {job.contactEmail}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button
                className={buttonVariants({
                  variant: "default",
                  size: "default",
                  className: "bg-custom-blue-2",
                })}
                onClick={() => setIsModalOpen(true)}
              >
                Ứng tuyển ngay
              </Button>
              <div className="mt-2 text-sm text-custom-gray">Hết hạn vào {formatDate(job.closingDate)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job description */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-custom-black">Mô tả công việc</h2>
              {formatNewLine(job.description).map((line, index) => (
                <p className="mb-4 text-gray-700" key={index}>
                  {line}
                </p>
              ))}
            </div>

            {/* Requirements */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Yêu cầu</h2>
              <ul className="text-gray-700 space-y-2">
                {formatNewLine(job.requirements).map((line, index) => (
                  <li className="flex items-start" key={index}>
                    <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-custom-yellow-3"></span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tổng quan công việc */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Tổng quan công việc</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-custom-gray">NGÀY ĐĂNG TUYỂN</div>
                      <div className="font-medium">{formatDate(job.createdAt)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-custom-gray">NGÀY KẾT THÚC</div>
                      <div className="font-medium">{formatDate(job.closingDate)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-custom-gray">TUYỂN</div>
                      <div className="font-medium">{job.count} ứng viên</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm text-custom-gray">LOẠI CÔNG VIỆC</div>
                      <div className="font-medium">{job.jobType}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                      <Briefcase className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-sm text-custom-gray">LĨNH VỰC</div>
                      <div className="font-medium">{job.industry}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <UCompanyInfoCard id={job.companyId} />

            {/* Share */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Chia sẻ công việc</h3>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center rounded px-4 py-2 text-white transition-colors space-x-2 bg-custom-blue-2 hover:bg-custom-blue-3">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center rounded bg-sky-500 px-4 py-2 text-white transition-colors space-x-2 hover:bg-sky-600">
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <h1 className="pb-10 text-2xl font-semibold">Các công việc liên quan:</h1>
          <UJobList showPagination={false} />
        </div>
      </div>
    </>
  );
};

export default UJobDetails;
