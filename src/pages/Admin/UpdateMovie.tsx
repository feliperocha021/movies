import { useNavigate, useParams } from "react-router-dom";
import { 
  useGetMovieByIdQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "../../redux/api/moviesApi"
import { useUploadSingleImageMutation } from "../../redux/api/uploadApi";
import { toast } from "react-toastify";
import type { MovieFormValues } from "./CreateMovie";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateMovieSchema } from "../../validators/updateMovieShecma";
import { useState, useEffect } from "react";
import { getErrorMessage } from "../../utils/errorHandler";
import type { MovieRequest } from "../../interfaces/movie";
import { useGetAllGenresQuery } from "../../redux/api/genreApi";

const UpdateMovie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetMovieByIdQuery(id!, { skip: !id });

  const movie = data?.data.movie;

  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<MovieFormValues>({
    resolver: zodResolver(updateMovieSchema)
  })

  const [ uploadImage, { isLoading: isUploadingImage } ] = useUploadSingleImageMutation();
  const [ updateMovie, { isLoading: isUpdatingMovie } ] = useUpdateMovieMutation();
  const [ deleteMovie, { isLoading: isDeletingMovie } ] = useDeleteMovieMutation();
  const { data: genres, isLoading: isLoadingGenres } = useGetAllGenresQuery();

  useEffect(() => {
    if (movie && genres?.data.genres) {
      reset({
        name: movie.name,
        image: movie.image,
        cast: movie.cast.map(c => ({ name: c })),
        details: movie.details,
        genre: movie.genre,
        numReviews: movie.numReviews,
        reviews: movie.reviews,
        year: movie.year,
      });
    }
  }, [movie, genres, reset])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const onSubmit = async (data: MovieFormValues) => {
    try {
      if (!id) {
        toast.error("Movie Not Found");
        return;
      }

      let filename = data.image;

      if (selectedImage && selectedImage instanceof File) {
        const response = await uploadImage(selectedImage).unwrap();
        filename = "http://localhost:3000/" + response.data.file.path;
      }

      const movieUpdated: MovieRequest = {
        ...data,
        cast: data.cast.map((c) => c.name ),
        image: filename,
      };

      await updateMovie({id, movieUpdated}).unwrap();
      toast.success("Movie updated successfully");
      setSelectedImage(undefined);
      navigate("/movies");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error(err);
    }
  }

  const handleDeleteMovie = async() => {
    try {
      if (!id) {
        toast.error("Movie Not Found");
        return;
      }
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/movies");
    } catch(err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error(err);
    }
  }

  if (isLoading) return <p>Loading Movie</p>
  if (!data || error) return <p>Movie Not Found</p>

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-green-200 w-200 text-2xl mb-4">Update Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input 
              type="text"
              {...register("name")}
              className="border px-2 py-1 w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </label>
        </div>
        <div className="mb-4">
          <label 
            className="block"
            >
            Year: 
            <input
              className="border px-2 py-1 w-full"
              type="number" 
              {...register("year", { valueAsNumber: true })}
            />
            {errors.year && <p className="text-red-500">{errors.year.message}</p>}
          </label>
        </div>
        <div className="mb-4">
          <label 
            className="block"
            >
            Details:
            <textarea
              className="border px-2 py-1 w-full"
              {...register("details")}
            ></textarea>
            {errors.details && <p className="text-red-500">{errors.details.message}</p>}
          </label>
        </div>
        <div className="mb-4">
          <label 
            className="block"
            >
            Cast:
            {fields.map((field, index) => (
              <div className="flex items-center mb-2" key={field.id}>
                <input
                  className="border px-2 py-1 w-full"
                  {...register(`cast.${index}.name`)}
                  placeholder={`Actor ${index + 1}`}
                />
                {errors.cast?.[index]?.name && (
                    <p className="ml-1 text-red-500">{errors.cast[index].name?.message}</p>
                )}
                { index > 0 && (
                  <button
                    className="ml-2 text-teal-500 cursor-pointer"
                    type="button"
                    onClick={() => remove(index) }
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              className="mt-2 text-blue-500 cursor-pointer"
              type="button"
              onClick={() => append({ name: "" })}
            >
              + Add cast
            </button>
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block"
            >
            Genre: 
            <select
              className="border px-2 py-1 w-full"
              {...register("genre")}
            >
              {isLoadingGenres ? (<option>Loading genres...</option>) : (genres?.data.genres.map((genre) => (
                <option 
                  key={genre.id} 
                  value={genre.id}
                >
                  {genre.name}
                </option>
              )))}
            </select>
            {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
          </label>
        </div>
        <div className="mb-4">
          <label className="block">Image:</label>
          {selectedImage ? (
            <div className="flex flex-col items-start">
              <img
                src={selectedImage instanceof File? URL.createObjectURL(selectedImage) : undefined}
                alt="Preview"
                className="w-40 h-40 object-cover mb-2"
              />
              <button
                type="button"
                className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setSelectedImage(undefined)}
              >
                Remove Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-white cursor-pointer p-10"
            />
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer"
            type="submit"
            disabled={isUpdatingMovie || isUploadingImage}
          >
            {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
          </button>

          <button
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer"
            type="button"
            onClick={handleDeleteMovie}
            disabled={isDeletingMovie}
          >
            {isDeletingMovie ? "Deleting" : "Delete Movie"}
          </button>
        </div>
      </form>
    </div>
  )
}
export default UpdateMovie;
