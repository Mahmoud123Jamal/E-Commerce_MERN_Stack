import { z } from "zod";
import type { TFunction } from "i18next";

export const createBaseSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t("validation.email")),
    password: z
      .string()
      .min(8, t("validation.passwordMin"))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        t("validation.passwordRegex"),
      ),
  });

export const createLoginSchema = (t: TFunction) => createBaseSchema(t);

export const createRegisterSchema = (t: TFunction) =>
  createBaseSchema(t).extend({
    name: z.string().min(3, t("validation.nameMin")),
  });
