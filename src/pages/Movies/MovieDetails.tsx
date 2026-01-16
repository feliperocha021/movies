import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { useGetMovieByIdQuery, useCreateMovieReviewMutation } from "../../redux/api/moviesApi";
import type { IReviewRequest } from "../../interfaces/movie";
import { getErrorMessage } from "../../utils/errorHandler";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams<{ id: string }>();
  const { data: movie, refetch } = useGetMovieByIdQuery(movieId!, { skip: !movieId });
  const { userInfo } = useAppSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useCreateMovieReviewMutation();

  const submitHandler = async (data: IReviewRequest) => {
    try {
      if(!movieId) {
        toast.error("Movie Not Found");
        navigate("/");
        return;
      }
      await createReview({ id: movieId, newReview: data }).unwrap();
      refetch();
      toast.success("Review successfully submitted!");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
    }
  }

  return (
    <>    
      <div>
        <Link to="/" className="text-white font-semibold hover:underline ml-80">
          Go Back
        </Link>
      </div>
      <div className="mt-8">
        <div className="flex justify-center items-center">
          <img 
            src={movie?.data.movie.image} 
            alt={movie?.data.movie.name} 
            className="w-[70%] rounded"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-12">
          <section>
            <h2 className="text-3xl my-4 font-extrabold text-center">{movie?.data.movie.name}</h2>
            <p className="my-4 sm:w-20 md:w-120 lg:w-140 text-[#B0B0B0]">{movie?.data.movie.details}</p>
          </section>
          <div>
            <p className="text-2xl font-semibold">Releasing Data: {movie?.data.movie.year}</p>
          </div>
          <div>
            {movie?.data.movie.cast.map((c, index) => (
              <ul key={index}>
                <li className="mt-4">{c}</li>
              </ul>
            ))}
          </div>
          <div className="w-[70%] mt-8">
              <MovieTabs
                movie={movie?.data.movie}
                userInfo={userInfo}
                loadingMovieReview={loadingMovieReview}
                submitHandler={submitHandler}
              />
          </div>
        </div>
      </div>
    </>
  )
}
export default MovieDetails;
