import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/moviesApi";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div
      className="flex flex-col mt-8 ml-8 md:flex-row
      justify-evenly items-center md:items-start"
    >
      <nav className="w-full ml-0 mb-4 md:w-40 md:ml-2 md:mb-0">
        <Link 
          to="/"
          className="transition duration-300 ease-in-out hover:bg-teal-200
          block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link 
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200
          block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>
      <div className="w-full mb-8 lg:w-150">
        <SliderUtil data={data} />
      </div>
    </div>
  )
}
export default Header