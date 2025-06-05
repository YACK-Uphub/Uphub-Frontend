// components/UStudentCard.tsx
import React from "react";
import Image from "next/image";
import {
  AcademicCapIcon,
  DocumentTextIcon,
  IdentificationIcon,
  LinkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {CurriculumVitae, SocialLink, Student} from "@/types/user";

export type UStudentCardProps = {
  student: Student;
};

/**
 * The main Student Card component.
 * Now set to stretch to full height, with the biography area flexing to take most space.
 */
const UCardStudent: React.FC<UStudentCardProps> = ({student}) => {
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
        <div className="flex flex-grow items-center px-6 py-4">
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

        {/* ====== Middle: Gender pill + Biography (flex-grow) ====== */}
        <div className="flex flex-col flex-shrink-0 h-48 px-6 py-4">
          {student.gender && (
              <div className="mb-2">
                {student.gender.toLowerCase() === "male" && (
                    <span
                        className="
                  inline-block
                  text-xs font-semibold
                  px-2 py-0.5
                  rounded-full
                  bg-[var(--color-custom-blue-3)]
                  text-[var(--color-custom-white)]
                "
                    >
                {student.gender}
              </span>
                )}
                {student.gender.toLowerCase() === "female" && (
                    <span
                        className="
                  inline-block
                  text-xs font-semibold
                  px-2 py-0.5
                  rounded-full
                  bg-[var(--color-custom-purple-bg)]
                  text-[var(--color-custom-purple-text)]
                "
                    >
                {student.gender}
              </span>
                )}
                {["male", "female"].indexOf(student.gender.toLowerCase()) < 0 && (
                    <span
                        className="
                  inline-block
                  text-xs font-semibold
                  px-2 py-0.5
                  rounded-full
                  bg-[var(--color-custom-gray)]
                  text-[var(--color-custom-black)]
                "
                    >
                {student.gender}
              </span>
                )}
              </div>
          )}

          {/* Biography snippet takes up remaining vertical space */}
          <p className="flex-grow text-sm leading-relaxed text-[var(--color-custom-gray)] overflow-auto">
            {bioPreview}
          </p>
        </div>

        <hr className="border-[var(--color-custom-gray)]"/>

        {/* ====== Bottom: School, Social Links, CVs ====== */}
        <div className="flex-shrink-0 px-6 py-4 space-y-3">
          {/* School */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <AcademicCapIcon className="h-5 w-5 mr-1 text-[var(--color-custom-gray)]"/>
              <p className="text-sm text-[var(--color-custom-gray)]">
              <span className="font-semibold text-[var(--color-custom-black)]">
                School:
              </span>{" "}
                {student.school}
              </p>
            </div>
          </div>

          {/* Social Links (if any) */}
          {student.socialLinks && student.socialLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                {student.socialLinks.map((link: SocialLink) => (
                    <a
                        key={link.id}
                        href={link.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                        title={link.name}
                    >
                      <LinkIcon className="h-5 w-5 text-[var(--color-custom-blue-2)]"/>
                    </a>
                ))}
              </div>
          )}

          {/* CV Documents (if any) */}
          {student.curriculumVitaes && student.curriculumVitaes.length > 0 && (
              <div>
                <p className="mb-1 flex items-center text-sm font-semibold text-[var(--color-custom-gray)]">
                  <DocumentTextIcon className="h-5 w-5 mr-1 text-[var(--color-custom-gray)]"/>
                  Curriculum Vitae
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {student.curriculumVitaes.map((cv: CurriculumVitae) => (
                      <li key={cv.id} className="text-sm">
                        <a
                            href={cv.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[var(--color-custom-blue-2)] hover:underline"
                        >
                          <DocumentTextIcon className="h-4 w-4 mr-1 text-[var(--color-custom-blue-2)]"/>
                          View CV #{cv.id}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
};

export default UCardStudent;
