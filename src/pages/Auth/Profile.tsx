import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { updateUserInfo } from "../../redux/features/auth/authSlice";
import { useUpdateMeMutation } from "../../redux/api/userApi";
import { useForm } from "react-hook-form";
import type { UpdateRequest } from "../../interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "../../validators/updateUserSchema";
import { getErrorMessage } from "../../utils/errorHandler";


const Profile = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useUpdateMeMutation()

  const { register, handleSubmit, formState: {errors} } = useForm<UpdateRequest>({
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email,
    },
    resolver: zodResolver(updateUserSchema)
  });

  const onSubmit = async (data: UpdateRequest) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(updateUserInfo({ user: res.data.user }))
      toast.success("User successfully updated");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error("Update Error", err);
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4 mt-40">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white mb-2"></label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="text"
                  {...register("username")}
                  placeholder="Username"
                  autoComplete="username"
                />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2"></label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  autoComplete="email"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit"
                  className="bg-teal-500 w-screen mt-8 font-bold text-white py-2 px-4
                  rounded hover:bg-teal-600"
                >
                  Update Profile
                </button>
                {loadingUpdateProfile && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile