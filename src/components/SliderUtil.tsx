import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { MoviesResponse } from "../interfaces/movie";
import MovieCard from "../pages/Movies/MovieCard";

interface SliderUtilProps {
  data?: MoviesResponse;
}

const SliderUtil = ({ data }: SliderUtilProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  }
  return (
    <Slider {...settings}>
      {data?.data.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Slider>
  )
}
export default SliderUtil