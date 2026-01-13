import z from "zod";
import { createReviewSchema } from "./createReviewSchema.js";

export const updateMovieSchema = z.object({
  name: z.string().nonempty("Name is required"),
  image: z.string().refine(
    (val) =>
      /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i.test(val) ||
      /^\/?.+\.(png|jpg|jpeg|gif|webp)$/i.test(val),
    { message: "Invalid image path or URL" }
  ).optional(),
  year: z.number().int("Year must be an integer").min(0),
  details: z.string().nonempty("Details are required"),
  cast: z.array(z.object({ name: z.string().nonempty("Cast name is required"), })).min(1, "Cast must have at one member"),
  reviews: z.array(createReviewSchema).optional(),
  numReviews: z.number().int("numReviews must be an integer").min(0).default(0),
  genre: z.string().nonempty("Genre is required"),
});
