"use client";
import { usePathname, useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";

const UAccountNavTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { key: "student", label: "Sinh viên", href: "/admin/accounts/students" },
    { key: "company", label: "Doanh nghiệp", href: "/admin/accounts/companies" },
    { key: "school", label: "Trường học", href: "/admin/accounts/schools" },
  ];

  return (
    <div className="py-2">
      <div className="flex space-x-8 border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <button
              key={tab.key}
              onClick={() => router.push(tab.href)}
              className={`flex items-center gap-2 pb-2 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-custom-blue-2 border-b-2 border-custom-blue-2 font-medium"
                  : "text-gray-500 hover:text-custom-blue-3"
              }`}
            >
              <UserIcon className={`h-5 w-5 ${isActive ? "text-custom-blue-2" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UAccountNavTab;
