import zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().email("Invalid emaill address"),
  password: zod.string().min(1, "Password is required"),
  token: zod.optional(zod.string()),
});

export const agentRechargeSchema = zod.object({
  amount: zod.string().min(1, "Amount required"),
});

export const eWalletWithdrawInformationUpdateSchema = zod.object({
  min: zod.optional(zod.string()),
  max: zod.optional(zod.string()),
  range: zod.optional(zod.array(zod.string())),
});

export const eWalletDepositInformationUpdateSchema = zod.object({
  min: zod.optional(zod.string()),
  max: zod.optional(zod.string()),
  range: zod.optional(zod.array(zod.string())),
  walletNumber: zod.optional(zod.string()),
});

export const passwordMatcherSchema = zod.object({
  currentPassword: zod.string().min(1, "Current Password is Required"),
});

export const VerificationCodeSchema = zod.object({
  token: zod
    .string()
    .min(6, "It should be a 6 Digit Code")
    .max(6, "It should be a 6 Digit Code"),
});

export const passwordChangeSchema = zod
  .object({
    newPassword: zod.string().min(1, "Password must be at least 6 characters"),
    confirmNewPassword: zod.string().min(1, "Confirm Password is Required"),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword == data.confirmNewPassword;
      }
      return true;
    },
    { path: ["confirmNewPassword"], message: "Confirm Password did not match" }
  );

export const gmailChangeSchema = zod.object({
  newGmail: zod.string().email("Enter a valid Gmail address"),
});

export const contactUpdateSchema = zod.object({
  email: zod.optional(zod.string().email()),
  telegram: zod.optional(zod.string()),
  facebook: zod.optional(zod.string()),
});

export const promoCodeUpdateSchema = zod.object({
  promo: zod.string(),
});

export const bonusUpdateSchema = zod.object({
  deposit: zod.string().min(1, "Deposit Bonus is require"),
});

export const addBankingSchema = zod.object({
  bankingId: zod.string(),
});
