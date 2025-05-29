"use client";
import React, {useEffect} from "react";
import {ArrowLeft, Calendar, Clock, Facebook, Globe, Mail, Phone, Twitter, Users} from "lucide-react";
import {formatDate, formatNewLine} from "@/utils/helpers";
import Image from "next/image";
import {useAppDispatch} from "@/libs/rtk/hooks";
import {useGetCompanyByIdQuery} from "@/services/companiesApi";
import {setCompanyId, setPageSize} from "@/features/job/slices/jobSlice";
import UJobList from "@/features/job/components/UJobList";
import UButton from "@/components/shared/UButton";
import {resetParams} from "../slices/companySlice";
import {useRouter} from "next/navigation";

const UCompanyDetails = ({id}: { id: number }) => {
    const {data: company, isLoading} = useGetCompanyByIdQuery(id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && company?.id) {
            dispatch(setPageSize(6));
            dispatch(setCompanyId(company.id));
        }
    }, [isLoading, company, dispatch]);
    const handleOnBack = () => {
        dispatch(resetParams());
        router.back();
    };
    if (isLoading) return;

    return (
            <div className="mx-auto min-h-screen max-w-6xl bg-gray-50 p-6">
                <UButton
                        label=""
                        icon={<ArrowLeft/>}
                        iconPosition="left"
                        onClick={handleOnBack}
                        backgroundColor="bg-custom-blue-1"
                        textColor="text-custom-blue-2"
                />
                {/* Header */}
                <div className="my-5 rounded-lg bg-white p-10 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full">
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
                                <div className="mt-1 flex items-center text-sm space-x-4 text-custom-gray">
                                <span className="flex items-center">
                                    <Phone className="mr-1 h-4 w-4"/>
                                    {company.phoneNumber}
                                </span>
                                    <span className="flex items-center">
                                    <Mail className="mr-1 h-4 w-4"/>
                                        {company.email}
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Main Content */}
                    <div className="flex flex-1 flex-col gap-6">
                        {/* Job description */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-custom-black">Mô tả công việc</h2>
                            {formatNewLine(company.description).map((line, index) => (
                                    <p className="mb-4 text-gray-700" key={index}>
                                        {line}
                                    </p>
                            ))}
                        </div>

                        {/* Requirements */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Yêu cầu</h2>
                            <ul className="text-gray-700 space-y-2">
                                {formatNewLine(company.benefit).map((line, index) => (
                                        <li className="flex items-start" key={index}>
                                            <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-custom-yellow-3"></span>
                                            {line}
                                        </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Tầm nhìn công ty</h2>
                            <ul className="text-gray-700 space-y-2">
                                {formatNewLine(company.vision).map((line, index) => (
                                        <li className="flex items-start" key={index}>
                                            {line}
                                        </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex w-full flex-col gap-6 lg:w-1/3">
                        {/* Tổng quan công việc */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                            <Calendar className="h-5 w-5 text-blue-600"/>
                                        </div>
                                        <div>
                                            <div className="text-sm text-custom-gray">THÀNH LẬP</div>
                                            <div className="font-medium">{formatDate(company.establishedDate)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                            <Clock className="h-5 w-5 text-green-600"/>
                                        </div>
                                        <div>
                                            <div className="text-sm text-custom-gray">PHÂN LOẠI TỔ CHỨC</div>
                                            <div className="font-medium">{company.organizationType}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                            <Users className="h-5 w-5 text-orange-600"/>
                                        </div>
                                        <div>
                                            <div className="text-sm text-custom-gray">QUY MÔ</div>
                                            <div className="font-medium">{company.companySize}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                            <Clock className="h-5 w-5 text-red-600"/>
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
                        <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">Thông tin liên lạc</h2>

                            <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                                <Globe className="text-blue-500" size={20}/>
                                <div>
                                    <p className="text-xs text-gray-400">WEBSITE</p>
                                    <p className="font-semibold text-gray-800">www.estherhoward.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                                <Phone className="text-blue-500" size={20}/>
                                <div>
                                    <p className="text-xs text-gray-400">SỐ ĐIỆN THOẠI</p>
                                    <p className="font-semibold text-gray-800">+1-202-555-0141</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                                <Mail className="text-blue-500" size={20}/>
                                <div>
                                    <p className="text-xs text-gray-400">ĐỊA CHỈ EMAIL</p>
                                    <p className="font-semibold text-gray-800">esther.howard@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Share */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold text-gray-900">Theo dõi</h3>
                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center rounded px-4 py-2 text-white transition-colors space-x-2 bg-custom-blue-2 hover:bg-custom-blue-3">
                                    <Facebook className="h-4 w-4"/>
                                    <span>Facebook</span>
                                </button>
                                <button className="flex items-center rounded bg-sky-500 px-4 py-2 text-white transition-colors space-x-2 hover:bg-sky-600">
                                    <Twitter className="h-4 w-4"/>
                                    <span>Twitter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-10">
                    <h1 className="pb-10 text-2xl font-semibold">Các công việc liên quan:</h1>
                    <UJobList showPagination={false}/>
                </div>
            </div>
    );
};

export default UCompanyDetails;
