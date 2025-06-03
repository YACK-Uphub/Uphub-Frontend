import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/shadcn/sidebar";
import USidebar from "@/components/layout/USidebar";
import { Bell, Briefcase, Home, Settings, Star } from "lucide-react";

const menuGroups = [
  {
    label: "Dashboard",
    items: [
      { title: "Công việc đã ứng tuyển", url: "/student/dashboard/applications", icon: Briefcase },
      { title: "Công việc yêu thích", url: "/student/dashboard/favorite-jobs", icon: Star },
      { title: "Thông báo việc làm", url: "/student/dashboard/job-alert", icon: Bell },
      { title: "Cài đặt", url: "/student/dashboard/settings", icon: Settings },
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
