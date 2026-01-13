import z from "zod";

export const createReviewSchema = z.object({
  rating: z.number({ error: "Rating is required" }).min(0).max(10),
  comment: z.string({ error: "Comment is required" }),
});
