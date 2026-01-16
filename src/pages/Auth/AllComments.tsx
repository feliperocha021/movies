import { useDeleteMovieReviewMutation, useGetAllMoviesQuery } from "../../redux/api/moviesApi";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorHandler";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteMovieReviewMutation();

  const handleDeleteComment = async (movieId: string, reviewId: string) => {
    try {
      await deleteComment({movieId, reviewId}).unwrap();
      refetch();
      toast.success("Comment successfully deleted");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error(err);
    }
  }

  return (
    <div>
      {movies?.data.movies.map((movie) => (
        <section key={movie.id} className="flex flex-col justify-center items-center">
          {movie.reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-[#1A1A1A] p-4 rounded-lg w-1/2 mt-8"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-[#B0B0B0]">{review.createdAt.substring(0, 10)}</p>
              </div>
              <p className="my-4">Rate: {review.rating}</p>
              <p className="my-4">Comment: {review.comment}</p>
              <button
                type="button"
                className="text-red-500 bg-[#202020] rounded shadow-2xs cursor-pointer"
                onClick={() => handleDeleteComment(movie.id, review.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
export default AllComments