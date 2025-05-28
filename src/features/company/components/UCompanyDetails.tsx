"use client";
import React, { useEffect } from "react";
import { Calendar, Clock, Users, Mail, Phone, Facebook, Twitter, Globe } from "lucide-react";
import { formatDate, formatNewLine } from "@/utils/helpers";
import Image from "next/image";
import { useAppDispatch } from "@/libs/rtk/hooks";
import { useGetCompanyByIdQuery } from "@/services/companiesApi";
import { setCompanyId, setPageSize } from "@/features/job/slices/jobSlice";
import UJobList from "@/features/job/components/UJobList";

const UCompanyDetails = ({ id }: { id: number }) => {
    const { data: company, isLoading } = useGetCompanyByIdQuery(id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoading && company?.id) {
            dispatch(setPageSize(6));
            dispatch(setCompanyId(company.id));
        }
    }, [isLoading, company, dispatch]);

    if (isLoading) return;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-10 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                            <Image
                                src={company.imageUrl}
                                alt="company image"
                                quality={50}
                                loading="lazy"
                                fill
                                objectFit={"cover"}
                                priority={false}
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-custom-black">{company.companyName}</h1>
                            <div className="flex items-center space-x-4 text-sm text-custom-gray mt-1">
                                <span className="flex items-center">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {company.phoneNumber}
                                </span>
                                <span className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {company.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Job description */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-custom-black mb-4">Mô tả công việc</h2>
                        {formatNewLine(company.description).map((line, index) => (
                            <p className="text-gray-700 mb-4" key={index}>
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Requirements */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Yêu cầu</h2>
                        <ul className="space-y-2 text-gray-700">
                            {formatNewLine(company.benefit).map((line, index) => (
                                <li className="flex items-start" key={index}>
                                    <span className="w-2 h-2 bg-custom-yellow-3 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tầm nhìn công ty</h2>
                        <ul className="space-y-2 text-gray-700">
                            {formatNewLine(company.vision).map((line, index) => (
                                <li className="flex items-start" key={index}>
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {/* Tổng quan công việc */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">THÀNH LẬP</div>
                                        <div className="font-medium">{formatDate(company.establishedDate)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">PHÂN LOẠI TỔ CHỨC</div>
                                        <div className="font-medium">{company.organizationType}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">QUY MÔ</div>
                                        <div className="font-medium">{company.companySize}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-custom-gray">LĨNH VỰC KINH DOANH</div>
                                        <div className="font-medium">{company.businessType}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="w-full max-w-md mx-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Thông tin liên lạc</h2>

                        <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                            <Globe className="text-blue-500" size={20} />
                            <div>
                                <p className="text-xs text-gray-400">WEBSITE</p>
                                <p className="font-semibold text-gray-800">www.estherhoward.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                            <Phone className="text-blue-500" size={20} />
                            <div>
                                <p className="text-xs text-gray-400">SỐ ĐIỆN THOẠI</p>
                                <p className="font-semibold text-gray-800">+1-202-555-0141</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                            <Mail className="text-blue-500" size={20} />
                            <div>
                                <p className="text-xs text-gray-400">ĐỊA CHỈ EMAIL</p>
                                <p className="font-semibold text-gray-800">esther.howard@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Share */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Theo dõi</h3>
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
                <UJobList showPagination={false} />
            </div>
        </div>
    );
};

export default UCompanyDetails;
