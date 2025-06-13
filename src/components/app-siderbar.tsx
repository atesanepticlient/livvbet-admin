"use client";

import * as React from "react";
import { CircleDollarSign } from "lucide-react";
import {
  MdOutlineSupportAgent,
  MdBusinessCenter,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { FaGear } from "react-icons/fa6";

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
          title: "Add Banking",
          url: "/payment/banking",
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
        {
          title: "Payouts",
          url: "/agents/payouts",
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
          url: "/users/explor",
        },
      ],
    },
    {
      title: "Site Center",
      url: "#",
      icon: MdBusinessCenter,
      items: [
        // {
        //   title: "Features",
        //   url: "#",
        // },
        {
          title: "Contact",
          url: "/contact",
        },
        {
          title: "Setting",
          url: "/site",
        },
      ],
    },
    {
      title: "Recharge",
      url: "#",
      icon: MdOutlineAccountBalanceWallet,
      items: [
        {
          title: "Users",
          url: "/recharge/users",
        },
        {
          title: "Agents",
          url: "/recharge/agents",
        },
      ],
    },
    {
      title: "Setting",
      url: "#",
      icon: FaGear,
      items: [
        {
          title: "Account",
          url: "/setting/account",
        },
        {
          title: "Email",
          url: "/setting/email",
        },
        {
          title: "Password",
          url: "/setting/password",
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
            name: admin!.fullName,
            email: admin!.email,
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
