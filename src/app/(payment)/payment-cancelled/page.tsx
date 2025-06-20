'use client';

import {XCircleIcon} from '@heroicons/react/24/solid';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function PaymentCancelledPage({
                                               searchParams,
                                             }: {
  searchParams: { orderCode: string };
}) {
  const router = useRouter();
  const orderCode = searchParams.orderCode;
  const [countDown, setCountDown] = useState(3);

  useEffect(() => {
    // tick every second
    const interval = setInterval(() => {
      setCountDown((c) => c - 1);
    }, 1000);

    // after 3s, go back
    const timeout = setTimeout(() => {
      router.back();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
      <div className="h-full flex flex-col items-center justify-center bg-custom-white px-4 text-center">
        <XCircleIcon
            className="h-20 w-20 text-[color:var(--color-custom-red-bg)] mb-6"
        />
        <h1 className="text-3xl font-bold text-[color:var(--color-custom-black)] mb-2">
          Thanh toán bị hủy
        </h1>
        <p className="text-base text-[color:var(--color-custom-gray)] mb-4">
          Mã đơn hàng:{' '}
          <span className="font-semibold">{orderCode}</span>
        </p>

        <p className="text-lg font-medium text-[color:var(--color-custom-black)] mb-6">
          Về lại trang chủ sau{' '}
          <span className="text-[color:var(--color-custom-blue-2)]">
          {Math.max(countDown, 0)}
        </span>
          s
        </p>

        <button
            onClick={() => router.back()}
            className="mt-2 bg-[color:var(--color-custom-blue-2)] text-[color:var(--color-custom-white)] px-6 py-3 rounded-md hover:bg-[color:var(--color-custom-blue-3)] transition"
        >
          Quay lại ngay
        </button>
      </div>
  );
}
