import type { IMovie } from "../../interfaces/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="w-50 h-50 relative group m-8">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full object-contain rounded mr-0 p-13 sm:p-2 transition duration-300
          ease-in-out transform group-hover:opacity-50"
        />
      </Link>
      <p
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0
        transition duration-300 ease-in-out group-hover:opacity-100"
      >
        {movie.name}
      </p>
    </div>
  )
}
export default MovieCard;
