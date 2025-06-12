"use client";

import {useSearchPlansQuery} from "@/services/plansApi";
import UCardPlan from "@/features/plans/components/UCardPlan";
import {PlanRoleEnum} from "@/types/plan";

export default function UCardPlansForCompany() {
  const {data, isLoading} = useSearchPlansQuery({role: PlanRoleEnum.Company});

  if (isLoading) return <p className="text-center py-8">Đang tải gói...</p>;
  if (!data?.results?.length) return <p className="text-center py-8">Không có gói phù hợp.</p>;

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {data.results.map((plan) => (
            <UCardPlan
                key={plan.id}
                plan={plan}
            />
        ))}
      </div>
  );
}
