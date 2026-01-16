import z from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(0, { error: "Rating must be at least 0" })
    .max(10, { error: "Rating must be at most 10" }),

  comment: z
    .string({ error: "Comment is required" })
});
