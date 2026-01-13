import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/moviesApi"

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();
  return (
    <div className="container mx-36">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-8 text-xl font-bold h-12">
            All Movies ({movies?.data.movies.length})
          </div>
          <div className="flex flex-wrap justify-around items-center p-8">
            {movies?.data.movies.map((movie) => (
              <Link 
                className="block mb-4 overflow-hidden"
                key={movie.id} 
                to={`/admin/movies/update/${movie.id}`}  
              >
                <div className="flex">
                  <div
                    className="max-w-sm m-8 rounded overflow-hidden shadow-lg"
                    key={movie.id}
                  >
                    <img 
                      src={movie.image} 
                      alt={movie.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-6 py-4 border border-gray-400">
                      <div className="font-bold text-xl mb-2">
                        {movie.name}
                      </div>
                    </div>
                    <p className="text-gray-700 text-base">{movie.details}</p>
                    <div className="mt-8 mb-4">
                      <Link 
                        to={`/admin/movies/update/${movie.id}`}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Update Movie
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminMoviesList