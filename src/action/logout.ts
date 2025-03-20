"use server";

import { INTERNAL_SERVER_ERROR } from "@/error";
import { signOut } from "next-auth/react";

export const logout = async () => {
  try {
    await signOut();

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};
