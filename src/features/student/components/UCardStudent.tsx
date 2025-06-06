// components/UStudentCard.tsx
import React from "react";
import Image from "next/image";
import {AcademicCapIcon, IdentificationIcon, UserCircleIcon,} from "@heroicons/react/24/outline";
import {Student} from "@/types/user";
import UButton from "@/components/shared/UButton";
import {useRouter} from "next/navigation";

export type UStudentCardProps = {
  student: Student;
  isStudentAssignMode: boolean;
};

/**
 * The main Student Card component.
 * Stretches to full height. If isStudentAssignMode=true, shows “Assign to Job” button at the bottom.
 */
const UCardStudent: React.FC<UStudentCardProps> = ({
                                                     student,
                                                     isStudentAssignMode,
                                                   }) => {
  const router = useRouter();

  const moveToAssignJobPage = (studentId: number | string) => {
    router.push(`/school/students/${studentId}/`);
  }

  const fullName = `${student.firstName} ${student.lastName}`;

  const bioPreview =
      student.biography && student.biography.length > 100
          ? student.biography.slice(0, 100).trim() + "…"
          : student.biography || "No biography provided.";

  return (
      <div
          className="
        flex
        flex-col
        h-full
        max-w-md
        w-full
        bg-[var(--color-custom-white)]
        rounded-xl
        shadow-lg
        hover:shadow-2xl
        transition-shadow
        duration-200
        overflow-hidden
      "
      >
        {/* ====== Top: Avatar + Name + Code ====== */}
        <div className="flex items-center px-6 py-4">
          <div className="flex-shrink-0">
            {student.imageUrl ? (
                <Image
                    src={student.imageUrl}
                    alt={fullName}
                    width={80}
                    height={80}
                    quality={30}
                    className="rounded-full object-cover"
                />
            ) : (
                <div className="w-20 h-20 bg-[var(--color-custom-gray)] rounded-full flex items-center justify-center">
                  <UserCircleIcon className="h-10 w-10 text-[var(--color-custom-white)]"/>
                </div>
            )}
          </div>
          <div className="ml-5 flex-grow">
            <h3 className="text-xl font-semibold text-[var(--color-custom-black)]">
              {fullName}
            </h3>
            <div className="mt-1 flex items-center text-sm text-[var(--color-custom-gray)]">
              <IdentificationIcon className="h-4 w-4 mr-1 text-[var(--color-custom-gray)]"/>
              <span>Code: {student.code}</span>
            </div>
          </div>
        </div>

        <hr className="border-[var(--color-custom-gray)]"/>

        {/* ====== Middle: Gender pill + Biography ====== */}
        <div className="flex flex-col flex-grow h-48 px-6 py-4">
          {student.gender && (
              <div className="mb-2">
                {student.gender.toLowerCase() === "male" ? (
                    <span
                        className="
                  inline-block text-xs font-semibold
                  px-2 py-0.5 rounded-full
                  bg-[var(--color-custom-blue-3)]
                  text-[var(--color-custom-white)]
                "
                    >
                {student.gender}
              </span>
                ) : student.gender.toLowerCase() === "female" ? (
                    <span
                        className="
                  inline-block text-xs font-semibold
                  px-2 py-0.5 rounded-full
                  bg-[var(--color-custom-purple-bg)]
                  text-[var(--color-custom-purple-text)]
                "
                    >
                {student.gender}
              </span>
                ) : (
                    <span
                        className="
                  inline-block text-xs font-semibold
                  px-2 py-0.5 rounded-full
                  bg-[var(--color-custom-gray)]
                  text-[var(--color-custom-black)]
                "
                    >
                {student.gender}
              </span>
                )}
              </div>
          )}

          <p className="flex-grow text-sm leading-relaxed text-[var(--color-custom-gray)] overflow-auto">
            {bioPreview}
          </p>
        </div>

        <hr className="border-[var(--color-custom-gray)]"/>

        {/* ====== Bottom: School, Social Links, CVs, and possibly Assign button ====== */}
        <div className={"flex flex-col items-center justify-stretch p-4 gap-4"}>
          <div className="flex-shrink-0 space-y-3">
            {/* School */}
            <div className="flex items-center space-x-4">
              <AcademicCapIcon className="h-5 w-5 mr-1 text-[var(--color-custom-gray)]"/>
              <p className="text-sm text-[var(--color-custom-gray)]">
                <span className="font-semibold text-[var(--color-custom-black)]">Trường:</span>{" "}{student.school}
              </p>
            </div>
          </div>

          {/* ASSIGN BUTTON (only in assign mode) */}
          {isStudentAssignMode && (
              <div onClick={(e) => e.stopPropagation()}>
                <UButton
                    onClick={() => moveToAssignJobPage(student.id)}
                    label="Chỉ định Công Việc"
                    backgroundColor="bg-custom-blue-2"
                    textColor="text-custom-white"
                    border="border border-transparent"
                />
              </div>
          )}
        </div>
      </div>
  );
};

export default UCardStudent;
