import React from "react";
import type {Metadata} from "next";
import UCardPlansForCompany from "@/features/plans/components/UCardPlansForCompany";

export const metadata: Metadata = {
  title: "EnterprisePaymentsPage",
  description: "Browse potential candidates for your internship positions on UpHub",
};

const EnterprisePaymentsPage = () => {
  return (
      <div>

        {/* Header */}
        <h2
            className="my-16 text-center
				sm:text-2xl sm:p-4 font-bold
				uppercase tracking-wide
				text-custom-blue-3"
        >
          Các gói dành cho doanh nghiệp
        </h2>

        <section className={"pb-8 px-12"}>
          <div className={"max-w-7xl mx-auto"}>
            <UCardPlansForCompany></UCardPlansForCompany>
          </div>
        </section>
      </div>
  );
};

export default EnterprisePaymentsPage;
