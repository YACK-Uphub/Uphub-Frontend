import {Plan} from "@/types/plan";
import {ArrowRightIcon, CheckCircleIcon, MinusCircleIcon} from "@heroicons/react/24/solid";
import {useAppSelector} from "@/libs/rtk/hooks";
import UButton from "@/components/shared/UButton";
import {useCreatePaymentMutation} from "@/services/paymentsApi";
import {UserRole} from "@/types/user";

interface UCardPlanProps {
  plan: Plan;
}

export default function UCardPlan({plan}: UCardPlanProps) {
  const {user} = useAppSelector((state) => state.auth);
  const [createPayment, {isLoading}] = useCreatePaymentMutation();

  // testing purpose
  // const userPlan = UserRole.CompanyEnterprise;
  const userPlan = user?.role as UserRole;
  const rolePlan = plan.role;
  const isCurrentPlan = userPlan === rolePlan;

  const handlePayment = async () => {
    try {
      const {checkoutUrl} = await createPayment({
        userId: Number(user.userId),
        planId: Number(plan.id),
      }).unwrap();

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Payment creation failed:", err);
    }
  };

  const renderFeatureItem = (enabled: boolean, text: string) => (
      <li className="flex items-center gap-2 text-sm text-[color:var(--color-custom-gray)]">
        {enabled ? (
            <CheckCircleIcon className="w-5 h-5 text-[color:var(--color-custom-green-text)]"/>
        ) : (
            <MinusCircleIcon className="w-5 h-5 text-[color:var(--color-custom-red-bg)]"/>
        )}
        {text}
      </li>
  );

  return (
      <div
          className={`
          flex flex-col gap-6 rounded-xl p-6 shadow-md
          hover:scale-105 hover:shadow-2xl transition-all duration-300 w-full max-w-sm
        ${isCurrentPlan
              ? "border-2 border-custom-yellow-3"
              : "border border-custom-blue-1"
          }
        bg-custom-white/80
      `}
      >
        {/* Plan Name & Description */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[color:var(--color-custom-black)] uppercase mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-[color:var(--color-custom-gray)] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-custom-blue-2">
          {plan.price.toLocaleString("vn-VI")} vnd
          <span className="text-base font-medium text-custom-gray/70"> /tháng</span>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {renderFeatureItem(true, `${plan.jobPostLimit} tin tuyển dụng`)}
          {renderFeatureItem(plan.cvReview, "Hỗ trợ đánh giá CV")}
          {renderFeatureItem(plan.featuredJob, "Việc khẩn cấp & nổi bật")}
          {renderFeatureItem(plan.highlightJob, "Tô màu công việc nổi bật")}
          {renderFeatureItem(true, "Truy cập & lưu 5 ứng viên")}
          {renderFeatureItem(true, "Hiển thị hồ sơ trong 10 ngày")}
          {renderFeatureItem(true, "Hỗ trợ khẩn cấp 24/7")}
        </ul>

        {/* CTA */}
        {isCurrentPlan ? (
            <div className="text-center text-sm font-bold text-custom-yellow-3">
              GÓI HIỆN TẠI
            </div>
        ) : (
            <UButton
                onClick={handlePayment}
                label={isLoading ? "Đang xử lý..." : "Chọn Gói"}
                icon={<ArrowRightIcon className="h-4 w-4"/>}
                iconPosition="right"
                width="w-full"
                backgroundColor="bg-[color:var(--color-custom-blue-2)]"
                textColor="text-[color:var(--color-custom-blue-1)]"
                border="border border-[color:var(--color-custom-blue-2)]"
                borderRadius="rounded-md"
            />
        )}
      </div>
  );
}
