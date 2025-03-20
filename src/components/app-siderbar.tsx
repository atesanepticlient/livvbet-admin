"use client";

import * as React from "react";
import { CircleDollarSign } from "lucide-react";
import { MdOutlineSupportAgent, MdBusinessCenter } from "react-icons/md";
import { IoIosGift } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import useCurrentUser from "@/hooks/useCurrentUser";

// This is sample data.
const data = {
  user: {
    name: "San Bin Hoque",
    email: "epti060@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  shortNavigation: [],
  navMain: [
    {
      title: "Payment",
      url: "#",
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: "Deposit",
          url: "/payment/deposits",
        },
        {
          title: "Withdraws",
          url: "/payment/withdraws",
        },
        {
          title: "Methods",
          url: "/payment/methods",
        },
      ],
    },
    {
      title: "Agent",
      url: "#",
      icon: MdOutlineSupportAgent,
      items: [
        {
          title: "Explor",
          url: "/agents/explor",
        },

        {
          title: "Pending",
          url: "/agents/pending",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: FaUsers,
      items: [
        {
          title: "Exlpor",
          url: "/users/expor",
        },
        {
          title: "Update Users",
          url: "#",
        },
      ],
    },
    {
      title: "Site Center",
      url: "#",
      icon: MdBusinessCenter,
      items: [
        {
          title: "Features",
          url: "#",
        },
        {
          title: "Contact",
          url: "/contact",
        },
        {
          title: "Setting",
          url: "/setting",
        },
      ],
    },
    {
      title: "Promo",
      url: "#",
      icon: IoIosGift,
      items: [
        {
          title: "Promo Codes",
          url: "/promo",
        },
        {
          title: "Bonus",
          url: "/bonus",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const admin = useCurrentUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "MD Hashem Mia",
            email: admin!.email,
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
