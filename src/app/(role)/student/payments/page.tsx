import React from "react";
import type {Metadata} from "next";
import UCardPlansForStudent from "@/features/plans/components/UCardPlansForStudent";

export const metadata: Metadata = {
  title: "StudentPaymentsPage",
  description: "Browse potential candidates for your internship positions on UpHub",
};

const StudentPaymentsPage = () => {
  return (
      <div>

        {/* Header */}
        <h2
            className="my-16 text-center
				sm:text-2xl sm:p-4 font-bold
				uppercase tracking-wide
				text-custom-blue-3"
        >
          Tìm công việc tốt hơn với các gói
        </h2>

        <section className={"pb-8 px-12"}>
          <div className={"max-w-5xl mx-auto"}>
            <UCardPlansForStudent></UCardPlansForStudent>
          </div>
        </section>
      </div>
  );
};

export default StudentPaymentsPage;
