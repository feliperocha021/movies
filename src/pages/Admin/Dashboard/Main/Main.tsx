import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/moviesApi";
import { useGetAllUsersQuery } from "../../../../redux/api/userApi";
import AllMovies from "../../../Movies/AllMovies";
import SecondaryCard from "./SecondaryCard";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetAllUsersQuery();
  const { data: movies } = useGetAllMoviesQuery();

  const totalCommentsLength = movies?.data.movies.map((movie) => movie.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce((acc, length) => acc + length, 0);

  return (
    <div>
      <section className="flex justify-around"></section>
      <div className="flex justify-around ml-100 lg:ml-56 mt-10">
        <div className="-translate-x-4 flex">
          <SecondaryCard 
            pill="Users"
            content={visitors?.data.user?.length || 0}
            info="20.2k more then usual"
            gradient="from-teal-500 to-lime-400"
          />
          <SecondaryCard 
            pill="Comments"
            content={sumOfCommentsLength || 0}
            info="742.8 more then usual"
            gradient="from-[#CCC514] to-[#CDCB8E]"
          />
          <SecondaryCard 
            pill="Movies"
            content={movies?.data.movies?.length || 0}
            info="372+ more then usual"
            gradient="from-green-500 to-lime-400"
          />
        </div>
      </div>
    </div>
  )
}
export default Main