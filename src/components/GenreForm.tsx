import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGenreSchema } from "../validators/createGenreSchema";
import type { GenreRequest, IGenre } from "../interfaces/genre";
import { useEffect } from "react";

interface GenreFormProps {
  genre?: IGenre;
  onSubmit: (genre: GenreRequest) => void;
  handleDelete?: () => void;
  buttonText?: string;
}

const GenreForm = ({
  genre,
  onSubmit,
  handleDelete,
  buttonText = "Submit"
}: GenreFormProps) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<GenreRequest>({
    defaultValues: {
      name: ""
    },
    resolver: zodResolver(createGenreSchema),
  });

  useEffect(() => {
    if (genre) {
      reset({ name: genre.name })
    } else {
      reset({ name: "" })
    }
  }, [genre, reset]);

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit((data) => { onSubmit(data); reset(); })}>
        <input
          className="py-3 px-4 border rounded-lg w-240 bg-black"
          type="text"
          placeholder="Write genre name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <div className="flex justify-between">
          <button
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus-ring-opacity-50"
            type="submit"
          >
            {buttonText}
          </button>
        
        {handleDelete && (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600
            focus:outline-none focus:ring-2 focus:ring-red-500 focus-ring-opacity-50"
            onClick={handleDelete}
            type="button"
          >
            Delete
          </button>
        )}
        </div>
      </form>
    </div>
  )
}
export default GenreForm
