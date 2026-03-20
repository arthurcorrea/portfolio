import { z } from "zod";

export const contactSchema = z.object({
  user_name: z.string().min(2, "name_min"),
  user_email: z.string().email("email_invalid"),
  message: z.string().min(10, "message_min"),
});

export type ContactFormData = z.infer<typeof contactSchema>;