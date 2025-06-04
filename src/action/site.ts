"use server";

import { db } from "@/lib/db"; // adjust path as needed
import { siteUpdateSchema, SiteUpdateSchema } from "@/schema";

export async function updateSiteAction(formData: SiteUpdateSchema) {
  const result = siteUpdateSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      error: result.error.format(),
    };
  }

  const { ...data } = result.data;

  const site = await db.site.findFirst({ where: {} });

  if (!site) return { success: false, error: "Please Seed a site first" };

  try {
    await db.site.update({
      where: { id: site.id },
      data,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: { error: "Failed to update contact info." },
    };
  }
}
