import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import USidebar from "@/components/layout/USidebar";
import { Bell, Briefcase, Home, Settings, Star } from "lucide-react";

const menuGroups = [
  {
    label: "Dashboard",
    items: [
      { title: "Tổng quan", url: "general", icon: Home },
      { title: "Công việc đã ứng tuyển", url: "applications", icon: Briefcase },
      { title: "Công việc yêu thích", url: "favorite-jobs", icon: Star },
      { title: "Thông báo việc làm", url: "job-alert", icon: Bell },
      { title: "Cài đặt", url: "settings", icon: Settings },
    ],
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider className="px-20">
      <USidebar groups={menuGroups} />
      <main>
        <SidebarTrigger />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
