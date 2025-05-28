import React, { ReactNode } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../shadcn/sidebar";
import Link from 'next/link';

type MenuItem = {
    title: string;
    url: string;
    icon?: React.ElementType;
};

type SidebarGroupData = {
    label: string;
    items: MenuItem[];
};

type USidebarProps = {
    groups: SidebarGroupData[];
    footer?: ReactNode;
};
export default function USidebar({ groups, footer }: USidebarProps) {
    return (
        <Sidebar collapsible="icon">
            {/* <SidebarHeader /> */}
            <SidebarContent>
                {groups.map((group, groupIndex) => (
                    <SidebarGroup key={groupIndex}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                {item.icon && <item.icon className="mr-2 w-4 h-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            {/* <SidebarFooter /> */}
        </Sidebar>
    );
}
