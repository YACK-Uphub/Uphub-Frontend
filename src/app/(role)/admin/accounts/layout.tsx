import UAccountNavTab from "@/features/dashboard/components/UAccountNavTab";
import { ReactNode } from "react";

export default function AccountsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-full pb-10">
        <h1 className="mb-5 text-2xl font-bold text-custom-blue-2">Quản lý tài khoản người dùng</h1>
        <UAccountNavTab />
        <div className="mx-auto mt-8 w-fit">{children}</div>
      </div>
    </div>
  );
}
