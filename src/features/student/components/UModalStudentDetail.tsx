// components/UModalStudentDetail.tsx
import * as React from "react";
import Image from "next/image";
import {CurriculumVitae, Skill, SocialLink} from "@/types/user";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  IdentificationIcon,
  LinkIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {ExternalLinkIcon} from "lucide-react";
import {formatDate} from "@/utils/functionHelpers";
import {useGetStudentByIdQuery} from "@/services/studentsApi";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";

export type UModalStudentDetailProps = {
  studentId: number;
};

export default function UModalStudentDetail({
                                              studentId,
                                            }: UModalStudentDetailProps) {
  const {data, isLoading, isFetching} = useGetStudentByIdQuery(studentId);

  if (isLoading || isFetching) {
    return <UPageSpinner/>;
  }

  const {
    imageUrl,
    firstName,
    lastName,
    code,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    industry,
    school,
    biography,
    curriculumVitaes,
    skills,
    socialLinks,
  } = data;

  const fullName = `${firstName} ${lastName}`;
  const formattedDob = dateOfBirth ? formatDate(dateOfBirth) : "Chưa cập nhật";

  return (
      <div className="mx-auto w-full max-w-3xl overflow-auto bg-[var(--color-custom-white)] rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* ===== LEFT PANEL: Profile ===== */}
          <div className="md:w-1/3 bg-[var(--color-custom-blue-1)]/20 p-6 flex flex-col items-center space-y-4">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={fullName}
                    width={120}
                    height={120}
                    quality={80}
                    className="rounded-full object-cover border-4 border-[var(--color-custom-blue-2)]"
                />
            ) : (
                <div
                    className="w-28 h-28 bg-[var(--color-custom-gray)]/10 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="h-12 w-12 text-[var(--color-custom-gray)]/60"/>
                </div>
            )}
            <h2 className="text-xl font-semibold text-[var(--color-custom-black)]">
              {fullName}
            </h2>
            <div className="flex items-center gap-1 text-sm text-[var(--color-custom-gray)]/80">
              <IdentificationIcon className="h-4 w-4 text-[var(--color-custom-gray)]/80"/>
              <span>{code || "Chưa có mã"}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              {skills &&
                  skills.length > 0 &&
                  skills.map((skill: Skill) => (
                      <span
                          key={skill.id}
                          className="
                    inline-block
                    bg-[var(--color-custom-blue-2)]/20
                    text-[var(--color-custom-blue-2)]
                    text-xs font-medium
                    px-2 py-0.5
                    rounded-full
                  "
                      >
                  {skill.name}
                </span>
                  ))}
            </div>
          </div>

          {/* ===== RIGHT PANEL: Details ===== */}
          <div className="p-6 space-y-6 md:w-2/3">
            {/* Biography */}
            <div className="rounded-lg border border-[var(--color-custom-gray)]/20 bg-[var(--color-custom-gray)]/5 p-4">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-[var(--color-custom-blue-3)]">
                <UserIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                TIỂU SỬ
              </h3>
              <p className="whitespace-pre-line text-[var(--color-custom-gray)]/80">
                {biography || "Chưa có tiểu sử."}
              </p>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Email
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {email || "Chưa có"}
                </span>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Điện thoại
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {phoneNumber || "Chưa có"}
                </span>
                </div>
              </div>
              {/* Date of Birth */}
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Ngày sinh
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {formattedDob}
                </span>
                </div>
              </div>
              {/* Gender */}
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Giới tính
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {gender || "Chưa có"}
                </span>
                </div>
              </div>
              {/* Industry */}
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Chuyên ngành
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {industry || "Chưa có"}
                </span>
                </div>
              </div>
              {/* School */}
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--color-custom-blue-3)]">
                  Trường
                </span>
                  <span className="text-sm text-[var(--color-custom-gray)]/90">
                  {school || "Chưa có"}
                </span>
                </div>
              </div>
            </div>

            {/* CV Documents */}
            {curriculumVitaes && curriculumVitaes.length > 0 && (
                <div
                    className="rounded-lg border border-[var(--color-custom-gray)]/20 bg-[var(--color-custom-gray)]/5 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[var(--color-custom-blue-3)]">
                    <DocumentTextIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                    HỒ SƠ (CV)
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-custom-gray)]">
                    {curriculumVitaes.map((cv: CurriculumVitae) => (
                        <li key={cv.id}>
                          <a
                              href={cv.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[var(--color-custom-blue-2)] hover:underline"
                          >
                            <DocumentTextIcon className="h-4 w-4 text-[var(--color-custom-blue-2)]"/>
                            Xem CV #{cv.id}
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
            )}

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
                <div
                    className="rounded-lg border border-[var(--color-custom-gray)]/20 bg-[var(--color-custom-gray)]/5 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[var(--color-custom-blue-3)]">
                    <LinkIcon className="h-5 w-5 text-[var(--color-custom-blue-3)]"/>
                    MẠNG XÃ HỘI
                  </h3>
                  <div className="flex flex-col gap-2 text-sm text-[var(--color-custom-gray)]">
                    {socialLinks.map((link: SocialLink) => (
                        <a
                            key={link.id}
                            href={link.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[var(--color-custom-blue-2)] hover:underline"
                        >
                          <ExternalLinkIcon className="h-4 w-4 text-[var(--color-custom-blue-2)]"/>
                          {link.name}
                        </a>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
