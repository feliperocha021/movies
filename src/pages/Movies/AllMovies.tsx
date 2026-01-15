import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import banner from "../../assets/banner.jpg";
import { useGetAllGenresQuery } from "../../redux/api/genreApi";
import { 
  useGetAllMoviesQuery, 
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/moviesApi";
import {
  setFilteredMovies,
  setMoviesFilter,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const dispatch = useAppDispatch();
  const { data: movies } = useGetAllMoviesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useAppSelector((state) => state.movies)

  const movieYears = useMemo(
    () => movies?.data.movies.map((movie) => movie.year) || [],
    [movies]
  );

  const uniqueYears = useMemo(
    () => Array.from(new Set(movieYears)),
    [movieYears]
  );

  useEffect(() => {
    dispatch(setFilteredMovies(movies?.data.movies || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [movies, movieYears, uniqueYears, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    
    const filteredMovies = movies?.data.movies.filter((movie) => movie.name.toLowerCase().includes(e.target.value.toLowerCase())) || [];
    dispatch(setFilteredMovies(filteredMovies));
  }

  const handleGenreChange = (genreId: string) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));

  if (!genreId) {  
    dispatch(setFilteredMovies(movies?.data.movies || [])); 
    return; 
  }

    const filterByGenre = movies?.data.movies.filter((movie) => movie.genre === genreId) || [];
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year: number) => {
  if (!year) {  
    dispatch(setFilteredMovies(movies?.data.movies || [])); 
    return; 
  }
  
    const filterByYear = movies?.data.movies.filter((movie) => movie.year === year) || [];
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption: string) => {
    dispatch(setMoviesFilter({ selectedSort: [sortOption] }))
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies?.data.movies || []));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies?.data.movies || []));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies?.data.movies || []));
        break;
      default:
        dispatch(setFilteredMovies(movies?.data.movies || []));
    }
  };
  
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 gap-4 -translate-y-20"
    >
      <>
        <section>
          <div 
            className="relative h-200 w-screen mb-10 flex items-center
            justify-center bg-cover"
            style={{backgroundImage: `url(${banner})`}}
          >
            <div className="absolute inset-0 bg-linear-to-b from-gray-800 to-black opacity-50"></div>
            <div className="relative z-10 text-center text-white mt-40">
              <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
              <p className="text-2xl">
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
            </div>
            <section className="absolute -bottom-20">
              <input 
                type="search" 
                className="w-full h-20 border px-10 outline-none rounded"
                placeholder="Search Movie"
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <section className="sorts-container mt-8 ml-40 w-120">
                <select 
                  className="border p-2 rounded"
                  value={moviesFilter.selectedGenre}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleGenreChange(e.target.value)}
                >
                  <option value="">Genres</option>
                  {genres?.data.genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
                <select
                  className="border p-2 ml-4 rounded"
                  value={moviesFilter.selectedYear}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleYearChange(Number(e.target.value))}
                >
                  <option value="">Years</option>
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  className="border p-2 ml-4 rounded"
                  value={moviesFilter.selectedSort}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSortChange(e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>
          <section className="mt-40 w-screen flex justify-center items-center flex-wrap">
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
            ))}
          </section>
        </section>
      </>
    </div>
  )
}
export default AllMovies