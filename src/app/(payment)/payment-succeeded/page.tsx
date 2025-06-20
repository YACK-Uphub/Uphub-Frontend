'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function PaymentSucceededPage({
                                               searchParams,
                                             }: {
  searchParams: { orderCode: string };
}) {
  const orderCode = searchParams.orderCode;
  const [countDown, setCountDown] = useState<number>(3);

  // start ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // when it reaches below 0, fire logout + redirect to /login
  useEffect(() => {
    if (countDown < 0) {
      signOut({ callbackUrl: '/' });
    }
  }, [countDown]);

  return (
      <div className="h-full flex flex-col items-center justify-center bg-custom-white px-4 text-center">
        <CheckCircleIcon className="h-20 w-20 text-[color:var(--color-custom-green-text)] mb-6" />

        <h1 className="text-3xl font-bold text-[color:var(--color-custom-black)] mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-base text-[color:var(--color-custom-gray)] mb-4">
          Mã đơn hàng: <span className="font-semibold">{orderCode}</span>
        </p>

        {/* Re login Page */}
        <p className="text-lg font-medium text-[color:var(--color-custom-black)] mb-4">
          Bạn hãy đăng nhập lại để trải nghiệm tính năng mới nhé.
        </p>

        {/* Count down until redirect */}
        <p className="text-base text-[color:var(--color-custom-gray)] mb-6">
          Tự động chuyển đến trang đăng nhập sau{' '}
          <span className="font-semibold text-[color:var(--color-custom-blue-2)]">
          {Math.max(countDown, 0)}
        </span>s
        </p>

        {/* Signout immediately  */}
        <Link
            href="/"
            className="mt-2 bg-[color:var(--color-custom-blue-2)] text-[color:var(--color-custom-white)] px-6 py-3 rounded-md hover:bg-[color:var(--color-custom-blue-3)] transition"
        >
          Đăng nhập lại
        </Link>
      </div>
  );
}
