import { db } from "./db";

export function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
  }
  return otp.toString();
}

export const createAdminVerificationToken = async (token: string) => {
  try {
    const existingToken = await db.adminEmailVerificationToken.findFirst({
      where: {},
    });
    const expires: Date = new Date(Date.now() + 3600 * 1000);
    if (existingToken) {
      return await db.adminEmailVerificationToken.update({
        where: { id: existingToken.id },
        data: {
          token,
          expire: expires,
        },
      });
    }

    return await db.adminEmailVerificationToken.create({
      data: { token, expire: expires },
    });
  } catch {
    return null;
  }
};
