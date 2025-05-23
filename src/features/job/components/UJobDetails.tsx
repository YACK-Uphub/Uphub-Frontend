"use client";
import React, { useEffect } from "react";
import { Calendar, Clock, Users, Briefcase, Mail, Phone, Facebook, Twitter } from "lucide-react";
import { Button, buttonVariants } from "@/components/shadcn/button";
import { useGetJobsByIdQuery } from "@/services/jobsApi";
import { formatDate, formatNewLine } from "@/utils/helpers";
import Image from "next/image";
import UCompanyInfoCard from "./UCompanyInfoCard";
import UJobList from "./UJobList";
import { setPageSize } from "../slices/jobSlice";
import { useAppDispatch, useAppSelector } from "@/libs/rtk/hooks";
import { companyApi } from "@/services/companiesApi";

const UJobDetails = ({ id }: { id: number }) => {
    const { data: job, isLoading } = useGetJobsByIdQuery(id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageSize(6));
    }, [dispatch]);

    // get company image url
    const imageUrl = useAppSelector((state) => {
        if (!job) return null;
        return companyApi.endpoints.getCompanyById.select(job.companyId)(state)?.data?.imageUrl;
    });

    if (isLoading) return;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-10 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
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
                            <div className="flex items-center space-x-4 text-sm text-custom-gray mt-1">
                                <span className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {job.contactPhone}
                                </span>
                                <span className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
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
                        >
                            Ứng tuyển ngay
                        </Button>
                        <div className="text-sm text-custom-gray mt-2">Hết hạn vào {formatDate(job.closingDate)}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Job description */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-custom-black mb-4">Mô tả công việc</h2>
                        {formatNewLine(job.description).map((line, index) => (
                            <p className="text-gray-700 mb-4" key={index}>
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Requirements */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Yêu cầu</h2>
                        <ul className="space-y-2 text-gray-700">
                            {formatNewLine(job.requirements).map((line, index) => (
                                <li className="flex items-start" key={index}>
                                    <span className="w-2 h-2 bg-custom-yellow-3 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Tổng quan công việc */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Tổng quan công việc</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">NGÀY ĐĂNG TUYỂN</div>
                                        <div className="font-medium">{formatDate(job.createdAt)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">NGÀY KẾT THÚC</div>
                                        <div className="font-medium">{formatDate(job.closingDate)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">TUYỂN</div>
                                        <div className="font-medium">{job.count} ứng viên</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">LOẠI CÔNG VIỆC</div>
                                        <div className="font-medium">{job.jobType}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-teal-600" />
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
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Chia sẻ công việc</h3>
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-custom-blue-2 text-white rounded hover:bg-custom-blue-3 transition-colors">
                                <Facebook className="w-4 h-4" />
                                <span>Facebook</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
                                <Twitter className="w-4 h-4" />
                                <span>Twitter</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-10">
                <h1 className="text-2xl font-semibold pb-10">Các công việc liên quan:</h1>
                <UJobList />
            </div>
        </div>
    );
};

export default UJobDetails;
