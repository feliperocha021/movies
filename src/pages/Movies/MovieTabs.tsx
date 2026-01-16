import { Link } from "react-router";
import type { IMovie, IReviewRequest } from "../../interfaces/movie";
import type { IUser } from "../../interfaces/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../../validators/reviewSchema";

interface MovieTabsProps {
  movie?: IMovie;
  userInfo: IUser | null;
  loadingMovieReview: boolean;
  submitHandler: (data: IReviewRequest) => void;
}

const MovieTabs = ({
  movie,
  userInfo,
  loadingMovieReview,
  submitHandler,
}: MovieTabsProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IReviewRequest>({
    defaultValues: {
      comment: "",
      rating: 10,
    },
    resolver: zodResolver(reviewSchema),
  });

  return (
    <div>
      <section>
        {userInfo ? (
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-2 flex flex-col gap-3">
              <label htmlFor="comment" className="block text-xl mb-2">Write Your Review</label>
              <textarea 
                id="comment"
                rows={3}
                {...register("comment")}
                className="p-2 border rounded-lg w-full text-black"
              />
              {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}
              <label htmlFor="rating" className="block text-xl mb-2">Rating (0-10)</label>
              <input 
                type="number"
                min={0}
                max={10}
                step={0.1}
                placeholder="rate between 0 and 10"
                {...register("rating", { valueAsNumber: true })}
                className="p-2 border rounded-lg w-full text-black"
              />
              <button
                type="submit"
                disabled={loadingMovieReview}
                className="bg-teal-600 text-white py-2 px-4 rounded-lg"
              >
                {loadingMovieReview ? "Submiting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <p>Please <Link to="/login" className="text-blue-500">Sign In</Link> to write a review</p>
        )}
      </section>
      <section className="mt-12">
        <div>{movie?.reviews.length === 0 && <p>No Reviews</p>}</div>
        <div>
          {movie?.reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-1/2 mt-8"
            >
              <div className="flex justify-between">
                <strong className="text-[#808080]">{review.name}</strong>
                <p className="text-[#808080]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              <div className="my-4">
                <p>Rate: {review.rating}</p>
                <p>Comment: {review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export default MovieTabs;
