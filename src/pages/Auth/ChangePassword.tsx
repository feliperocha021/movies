import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../components/Loader";
import type { ChangePasswordRequest } from "../../interfaces/auth";
import { useChangePasswordMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { changePasswordUserSchema } from "../../validators/changePasswordUserSchema";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorHandler";
import { useForm } from "react-hook-form";

interface ChangePasswordForm extends ChangePasswordRequest {
  confirmPassword: string
}

const ChangePassword = () => {
  const dispatch = useAppDispatch();

  const [changePassword, {isLoading: loadingChangePassowrd}] = useChangePasswordMutation()

  const { register, handleSubmit, formState: {errors} } = useForm<ChangePasswordForm>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(changePasswordUserSchema)
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const res = await changePassword(data).unwrap();
      dispatch(setCredentials({ user: res.data.user, accessToken: res.data.accessToken }))
      toast.success("Password successfully changed");
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      console.error("Change password Error", err);
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4 mt-40">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="text" 
                name="username" 
                autoComplete="username" 
                value={""} 
                hidden 
                readOnly 
              />
              <div className="mb-4">
                <label htmlFor="currentPaswword" className="block text-white mb-2"></label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="password"
                  {...register("currentPassword")}
                  placeholder="Current Password"
                  autoComplete="current-password"
                />
                {errors.currentPassword && <span className="text-red-500">{errors.currentPassword.message}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-white mb-2"></label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="password"
                  {...register("newPassword")}
                  placeholder="New Password"
                  autoComplete="new-password"
                />
                {errors.newPassword && <span className="text-red-500">{errors.newPassword.message}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-white mb-2"></label>
                <input
                  className="form-input p-4 rounded-sm w-full"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Passowrd"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
              </div>
              <div className="flex justify-between">
                <button 
                  type="submit"
                  className="bg-teal-500 w-screen mt-8 font-bold text-white py-2 px-4
                  rounded hover:bg-teal-600"
                >
                  Change Password
                </button>
                {loadingChangePassowrd && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword