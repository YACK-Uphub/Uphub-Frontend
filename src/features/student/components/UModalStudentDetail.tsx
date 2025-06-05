// components/UModalStudentDetail.tsx
import * as React from "react";
import Image from "next/image";
import {CurriculumVitae, Skill, SocialLink, Student} from "@/types/user";
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
  UserIcon
} from "@heroicons/react/24/outline";
import {ExternalLinkIcon} from "lucide-react";
import {formatDate} from "@/utils/helpers";

export type UModalStudentDetailProps = {
  student: Student;
};

export default function UModalStudentDetail({student}: UModalStudentDetailProps) {
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
  } = student;

  const fullName = `${firstName} ${lastName}`;
  const formattedDob = dateOfBirth
      ? formatDate(dateOfBirth)
      : "Chưa cập nhật";

  return (
      <div className="mx-auto flex flex-col gap-8 md:flex-row">
        {/* ===== LEFT: Profile & Biography ===== */}
        <div className="flex-1 space-y-6">
          {/* Header: Avatar, Name, Code */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {imageUrl ? (
                  <Image
                      src={imageUrl}
                      alt={fullName}
                      width={100}
                      height={100}
                      quality={80}
                      className="rounded-full object-cover border-2 border-custom-blue-1"
                  />
              ) : (
                  <div className="w-24 h-24 bg-custom-gray/20 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-12 w-12 text-custom-gray/70"/>
                  </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-custom-black">{fullName}</h2>
              <div className="mt-1 flex items-center text-sm text-custom-gray/80">
                <IdentificationIcon className="h-4 w-4 mr-1 text-custom-gray/80"/>
                <span>Mã SV: {code || "Chưa có"}</span>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="border-b pb-4 border-custom-gray/30">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold uppercase text-custom-blue-3">
              <UserIcon className="h-5 w-5 text-custom-blue-3"/>
              TIỂU SỬ
            </h3>
            <p className="whitespace-pre-line text-custom-gray/70">
              {biography || "Chưa có tiểu sử."}
            </p>
          </div>
        </div>

        {/* ===== RIGHT: Info Cards ===== */}
        <div className="w-full md:w-80 space-y-4">
          {/* Basic Info Card */}
          <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
              <AcademicCapIcon className="h-5 w-5 text-custom-blue-3"/>
              THÔNG TIN CƠ BẢN
            </h4>
            <div className="text-sm text-custom-gray/80 space-y-3">
              {/* Email */}
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Email:</strong> {email || "Chưa có"}
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-3">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Điện thoại:</strong> {phoneNumber || "Chưa có"}
                </div>
              </div>
              {/* Date of Birth */}
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Ngày sinh:</strong> {formattedDob}
                </div>
              </div>
              {/* Gender */}
              <div className="flex items-start gap-3">
                <UserIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Giới tính:</strong> {gender || "Chưa có"}
                </div>
              </div>
              {/* Chuyên ngành */}
              <div className="flex items-start gap-3">
                <BriefcaseIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Chuyên ngành:</strong> {industry || "Chưa có"}
                </div>
              </div>
              {/* Trường */}
              <div className="flex items-start gap-3">
                <AcademicCapIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-custom-gray/70"/>
                <div className="flex items-center gap-2">
                  <strong className="text-custom-black">Trường:</strong> {school || "Chưa có"}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          {skills && skills.length > 0 && (
              <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
                  <DocumentTextIcon className="h-5 w-5 text-custom-blue-3"/>
                  KỸ NĂNG
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: Skill) => (
                      <span
                          key={skill.id}
                          className="
                    inline-block
                    bg-custom-blue-1/10
                    text-custom-blue-2
                    text-xs font-semibold
                    px-2 py-0.5
                    rounded-full
                  "
                      >
                  {skill.name}
                </span>
                  ))}
                </div>
              </div>
          )}

          {/* CV Documents Card */}
          {curriculumVitaes && curriculumVitaes.length > 0 && (
              <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
                  <DocumentTextIcon className="h-5 w-5 text-custom-blue-3"/>
                  HỒ SƠ (CV)
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {curriculumVitaes.map((cv: CurriculumVitae) => (
                      <li key={cv.id}>
                        <a
                            href={cv.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-custom-blue-2 hover:underline"
                        >
                          <DocumentTextIcon className="h-4 w-4 text-custom-blue-2"/>
                          Xem CV #{cv.id}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
          )}

          {/* Social Links Card */}
          {socialLinks && socialLinks.length > 0 && (
              <div className="rounded-lg border p-4 border-custom-gray/20 bg-custom-gray/5">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-custom-blue-3">
                  <LinkIcon className="h-5 w-5 text-custom-blue-3"/>
                  MẠNG XÃ HỘI
                </h4>
                <div className="flex flex-col gap-2 text-sm">
                  {socialLinks.map((link: SocialLink) => (
                      <a
                          key={link.id}
                          href={link.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-custom-blue-2 hover:underline"
                      >
                        <ExternalLinkIcon className="h-4 w-4 text-custom-blue-2"/>
                        {link.name}
                      </a>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
