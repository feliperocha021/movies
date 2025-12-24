import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().nonempty({ message: "Password is required" }),
});
