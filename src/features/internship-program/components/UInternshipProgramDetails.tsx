"use client";
import React, { useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Facebook, Globe, Mail, Phone, Twitter, Users } from "lucide-react";
import { formatDate, formatNewLine } from "@/utils/helpers";
import Image from "next/image";
import { useAppDispatch } from "@/libs/rtk/hooks";
import UButton from "@/components/shared/UButton";
import { useRouter } from "next/navigation";
import { useGetInternshipProgramByIdQuery } from "@/services/internshipProgramsApi";
import { setInternshipProgramId, setPageSize } from "@/features/company/slices/companySlice";
import { resetParams } from "../slices/internshipProgramSlice";

const UInternshipProgramDetails = ({ id }: { id: number }) => {
  const { data: program, isLoading } = useGetInternshipProgramByIdQuery(id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && program?.id) {
      dispatch(setPageSize(6));
      dispatch(setInternshipProgramId(program.id));
    }
  }, [isLoading, program, dispatch]);

  const handleOnBack = () => {
    dispatch(resetParams());
    router.back();
  };

  if (isLoading) return;

  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-gray-50 p-6">
      {/* Back Button */}
      <div className="mb-6">
        <UButton
          label=""
          icon={<ArrowLeft />}
          iconPosition="left"
          onClick={handleOnBack}
          backgroundColor="bg-custom-blue-1"
          textColor="text-custom-blue-2"
        />
      </div>

      {/* Header */}
      <div className="mb-6 rounded-2xl bg-yellow-50 p-10 shadow-md">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200">
            <Image
              src={program.imageUrl}
              alt="program image"
              quality={80}
              loading="lazy"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-custom-blue-2">{program.name}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Program Description */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-custom-blue-2">Mô tả</h2>
            {formatNewLine(program.description).map((line, index) => (
              <p className="mb-4 text-gray-700 leading-relaxed" key={index}>
                {line}
              </p>
            ))}
          </div>

          {/* Agreements */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-custom-blue-2">Điều khoản & Thoả thuận</h2>
            <ul className="text-gray-700 space-y-3">
              {formatNewLine(program.agreements).map((line, index) => (
                <li className="flex items-start text-sm leading-relaxed" key={index}>
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-custom-yellow-3"></span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-custom-blue-2">Liên kết doanh nghiệp</h2>
            <ul className="text-gray-700 space-y-3">
              {formatNewLine(program.partnerships).map((line, index) => (
                <li className="text-sm leading-relaxed" key={index}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex w-full flex-col gap-6 lg:w-1/3">
          {/* Overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm space-y-6">
            {[
              {
                icon: <Calendar className="h-5 w-5 text-blue-600" />,
                label: "NGÀY BẮt ĐẦU",
                value: formatDate(program.startDate),
                bg: "bg-blue-100",
              },
              {
                icon: <Clock className="h-5 w-5 text-green-600" />,
                label: "NGÀY KẾT THÚC",
                value: formatDate(program.endDate),
                bg: "bg-green-100",
              },
              {
                icon: <Users className="h-5 w-5 text-orange-600" />,
                label: "HỌC KỲ",
                value: program.internshipTerm,
                bg: "bg-orange-100",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>{item.icon}</div>
                <div>
                  <div className="text-xs text-custom-gray">{item.label}</div>
                  <div className="text-sm font-medium text-custom-red-bg">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Thông tin liên lạc</h2>

            {[
              {
                icon: <Globe className="text-blue-500" size={20} />,
                label: "WEBSITE",
                value: "http://fpt.edu.com",
              },
              {
                icon: <Phone className="text-blue-500" size={20} />,
                label: "SỐ ĐIỆN THOẠI",
                value: "02873005585",
              },
              {
                icon: <Mail className="text-blue-500" size={20} />,
                label: "ĐỊA CHỈ EMAIL",
                value: "QLDTHCM1@fe.edu.vn",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-t border-gray-100 pt-4">
                {item.icon}
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Share */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Theo dõi</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded px-4 py-2 text-white bg-custom-blue-2 hover:bg-custom-blue-3">
                <Facebook className="h-4 w-4" /> <span>Facebook</span>
              </button>
              <button className="flex items-center gap-2 rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-600">
                <Twitter className="h-4 w-4" /> <span>Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UInternshipProgramDetails;
