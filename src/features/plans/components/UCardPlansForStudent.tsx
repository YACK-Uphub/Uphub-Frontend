"use client";

import {useSearchPlansQuery} from "@/services/plansApi";
import UCardPlan from "@/features/plans/components/UCardPlan";
import {PlanRoleEnum} from "@/types/plan";
import {UPageSpinner} from "@/components/shared/spinner/UPageSpinner";

export default function UCardPlansForStudent() {
  const {data, isLoading} = useSearchPlansQuery({role: PlanRoleEnum.Student});

  if (isLoading) return <UPageSpinner></UPageSpinner>
  if (!data?.results?.length) return <p className="py-8 text-center">Không có gói phù hợp.</p>;

  return (
      <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
        {data.results.map((plan) => (
            <UCardPlan
                key={plan.id}
                plan={plan}
            />
        ))}
      </div>
  );
}
