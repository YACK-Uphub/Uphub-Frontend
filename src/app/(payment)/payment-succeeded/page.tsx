"use client";

import {useSearchParams} from "next/navigation";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function PaymentSucceededPage() {
  const params = useSearchParams();
  const orderCode = params.get("orderCode");

  return (
      <div
          className="h-full flex flex-col items-center justify-center bg-[color:var(--color-custom-green-bg)] px-4 text-center">
        <CheckCircleIcon className="h-20 w-20 text-[color:var(--color-custom-green-text)] mb-6"/>
        <h1 className="text-3xl font-bold text-[color:var(--color-custom-black)] mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-base text-[color:var(--color-custom-gray)] mb-4">
          Mã đơn hàng: <span className="font-semibold">{orderCode}</span>
        </p>
        <Link
            href="/"
            className="mt-4 bg-[color:var(--color-custom-blue-2)] text-[color:var(--color-custom-white)] px-6 py-3 rounded-md hover:bg-[color:var(--color-custom-blue-3)] transition"
        >
          Quay lại trang chủ
        </Link>
      </div>
  );
}
