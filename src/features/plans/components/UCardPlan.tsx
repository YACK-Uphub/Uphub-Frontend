import {Plan} from "@/types/plan";
import {ArrowRightIcon, CheckCircleIcon, MinusCircleIcon} from "@heroicons/react/24/solid";
import {useAppSelector} from "@/libs/rtk/hooks";
import UButton from "@/components/shared/UButton";
import {useCreatePaymentMutation} from "@/services/paymentsApi";

interface UCardPlanProps {
  plan: Plan;
}

export default function UCardPlan({plan}: UCardPlanProps) {
  const {user} = useAppSelector((state) => state.auth);
  const [createPayment, {isLoading}] = useCreatePaymentMutation();

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
          className="rounded-xl border border-[color:var(--color-custom-blue-1)] p-6 bg-[color:var(--color-custom-white)] shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-sm">
        {/* Plan Name & Description */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-[color:var(--color-custom-black)] uppercase mb-1">
            {plan.name}
          </h3>
          <p className="text-sm text-[color:var(--color-custom-gray)] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold text-[color:var(--color-custom-blue-3)] mb-1">
          {plan.price.toLocaleString()}
          <span className="text-base font-medium text-[color:var(--color-custom-black)]">vnd</span>
        </div>
        <p className="text-xs text-[color:var(--color-custom-gray)] mb-5">/tháng</p>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {renderFeatureItem(true, `${plan.jobPostLimit} tin tuyển dụng`)}
          {renderFeatureItem(plan.cvReview, "Hỗ trợ đánh giá CV")}
          {renderFeatureItem(plan.featuredJob, "Việc khẩn cấp & nổi bật")}
          {renderFeatureItem(plan.highlightJob, "Tô màu công việc nổi bật")}
          {renderFeatureItem(true, "Truy cập & lưu 5 ứng viên")}
          {renderFeatureItem(true, "Hiển thị hồ sơ trong 10 ngày")}
          {renderFeatureItem(true, "Hỗ trợ khẩn cấp 24/7")}
        </ul>

        {/* CTA Button */}
        <UButton
            onClick={handlePayment}
            label={isLoading ? "Đang xử lý..." : "Chọn Gói"}
            icon={<ArrowRightIcon className="w-4 h-4"/>}
            iconPosition="right"
            width="w-full"
            backgroundColor="bg-[color:var(--color-custom-blue-2)]"
            textColor="text-[color:var(--color-custom-blue-1)]"
            border="border border-[color:var(--color-custom-blue-2)]"
            borderRadius="rounded-md"
        />
      </div>
  );
}
