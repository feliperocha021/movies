import type { GenreRequest, IGenre } from "../../interfaces/genre";
import { toast } from "react-toastify";
import { useCreateGenreMutation, useDeleteGenreMutation, useGetAllGenresQuery, useUpdateGenreMutation } from "../../redux/api/genreApi";
import { useState } from "react";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { getErrorMessage } from "../../utils/errorHandler";

const GenreList = () => {
  const { data: genres, refetch } = useGetAllGenresQuery();
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const [selectedGenre, setSelectedGenre] = useState<IGenre | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleCreateGenre = async (data: GenreRequest) => {
      try {
        await createGenre(data).unwrap();
        toast.success("Genre successful created!");
        refetch();
      } catch (err) {
        const message = getErrorMessage(err);
        toast.error(message);
        console.error("Genre error", err);
      }
    };

  const handleUpdateGenre = async (data: GenreRequest) => {
    if(!selectedGenre) return;
    try {
      await updateGenre({ id: selectedGenre.id, genreUpdated: data }).unwrap();
      toast.success("Genre successfully updated!");
      refetch();
      setModalVisible(false);
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error("Updated error", err);
    }
  };

  const handleDeleteGenre = async () => {
    if (!selectedGenre) return;

    try {
      await deleteGenre(selectedGenre.id).unwrap();
      toast.success("Genre successfully deleted!");
      refetch();
      setSelectedGenre(undefined);
      setModalVisible(false);
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error("Delete error", err);
    }
  };

  return (
    <div className="ml-40 flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>
        {/* CREATE FORM */}
        <GenreForm 
          onSubmit={handleCreateGenre} 
        />

        <br />

        {/* LIST OF GENRES */}
        <div className="flex flex-wrap">
          {genres?.data.genres.map((genre) => (
            <div key={genre.id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4
                rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none
                focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            genre={selectedGenre}
            onSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  )
};
export default GenreList