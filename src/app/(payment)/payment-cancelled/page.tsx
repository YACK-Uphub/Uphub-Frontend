"use client";

import {useSearchParams} from "next/navigation";
import {XCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function PaymentCancelledPage() {
  const params = useSearchParams();
  const orderCode = params.get("orderCode");

  return (
      <div
          className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--color-custom-red-text)] px-4 text-center">
        <XCircleIcon className="h-20 w-20 text-[color:var(--color-custom-red-bg)] mb-6"/>
        <h1 className="text-3xl font-bold text-[color:var(--color-custom-black)] mb-2">
          Thanh toán bị hủy
        </h1>
        <p className="text-base text-[color:var(--color-custom-gray)] mb-4">
          Mã đơn hàng: <span className="font-semibold">{orderCode}</span>
        </p>
        <Link
            href="/payments"
            className="mt-4 bg-[color:var(--color-custom-blue-2)] text-[color:var(--color-custom-white)] px-6 py-3 rounded-md hover:bg-[color:var(--color-custom-blue-3)] transition"
        >
          Quay lại trang chủ
        </Link>
      </div>
  );
}
