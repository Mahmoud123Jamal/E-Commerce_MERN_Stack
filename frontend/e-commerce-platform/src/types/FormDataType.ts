import type { z } from "zod";
import { loginSchema, registerSchema } from "../validations/formSchema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
