import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/moviesApi";
import { useGetAllGenresQuery } from "../../redux/api/genreApi"
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useGetAllGenresQuery();

  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);

  const handleGenreClick = (genreId: string) => {
    setSelectedGenre(genreId);
  }

  const filteredMovies = newMovies ? { 
    ...newMovies,
    data: {
      ...newMovies.data,
      movies: newMovies.data.movies.filter((movie) => movie.genre === selectedGenre)
    }
  } : undefined;

  return (
    <div className="flex items-center flex-col lg:flex-row lg:justify-evenly">
        <nav className="ml-16 flex flex-row sm:flex-row md:flex-row lg:flex-col xl:flex-col">
          {genres?.data.genres.map((g) => (
            <button 
              key={g.id}
              className={`transition duration-300 ease-in-out hover:bg-gray-200
                block p-2 rounded mb-4 text-lg ${
                  selectedGenre === g.id ? "bg-gray-200" : ""
                }`}
              onClick={() => handleGenreClick(g.id)}
            >
              {g.name}
            </button>
          ))}
        </nav>
        <section className="flex flex-col justify-center items-center w-full lg:w-auto">
          <div className="w-full lg:w-150 mb-8">
            <h1 className="mb-5">Choose For You</h1>
            <SliderUtil data={randomMovies} />
          </div>
          <div className="w-full mb-8 lg:w-150">
            <h1 className="mb-5">Top Movies</h1>
            <SliderUtil data={topMovies} />
          </div>
          <div className="w-full mb-8 lg:w-150">
            <h1 className="mb-5">Choose Movie</h1>
            <SliderUtil data={filteredMovies} />
          </div>
        </section>
    </div>
  )
}
export default MoviesContainerPage;
