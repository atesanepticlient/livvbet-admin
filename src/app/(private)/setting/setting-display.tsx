"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";

import admin_icon from "@/../public/admin.png";
import useCurrentUser from "@/hooks/useCurrentUser";

import { MdOutlinePassword } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { Badge } from "@/components/ui/badge";

const SettingDisplay = ({
  setOption,
}: {
  setOption: (option: "DISPLAY" | "PASSWORD" | "GMAIL" | "VERIFY") => void;
}) => {
  const admin = useCurrentUser();

  return (
    <Card className="w-full">
      <CardHeader>Setting</CardHeader>
      <CardContent>
        <div className="flex justify-center flex-col items-center py-2">
          <Image
            placeholder="blur"
            src={admin_icon}
            alt="admin"
            className="w-[64px] aspect-square mx-auto"
          />
          <p className="text-lg md:text-xl font-bold text-center mt-1">
            {admin!.email}
          </p>
          {admin?.email !== admin?.twoFAEmail && (
            <button onClick={() => setOption("VERIFY")}>
              <Badge className="bg-blue-600 my-1">Verify</Badge>
            </button>
          )}
        </div>

        <div className="mt-2 md:mt-3 flex flex-col gap-2">
          <button
            onClick={() => setOption("PASSWORD")}
            className="w-full border p-2 rounded-sm hover:bg-secondary transition-colors flex items-center justify-start gap-1 text-sm "
          >
            <MdOutlinePassword className="w-4 h-4" /> Change Password
          </button>

          <button
            onClick={() => setOption("GMAIL")}
            className="w-full border p-2 rounded-sm hover:bg-secondary transition-colors flex items-center justify-start gap-1 text-sm "
          >
            <CgMail className="w-4 h-4" /> Change Gmail
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingDisplay;
