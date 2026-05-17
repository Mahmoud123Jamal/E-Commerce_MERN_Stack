import { z } from "zod";

const baseSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم ورمز خاص",
    ),
});

export const loginSchema = baseSchema;

export const registerSchema = baseSchema.extend({
  name: z.string().min(3, "الاسم يجب أن يكون 3 حروف على الأقل"),
});
