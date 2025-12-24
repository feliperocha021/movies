import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "../../components/Loader";
import { type LoginRequest } from "../../interfaces/auth";
import { loginSchema } from "../../validators/loginSchema";
import { getErrorMessage } from "../../utils/errorHandler";

const Login = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [login, {isLoading}] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo])

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ user: res.data.user, accessToken: res.data.accessToken }));
      toast.success("Login successful!");
    } catch (err) {
      const message= getErrorMessage(err);
      toast.error(message);
      console.error("Login error", err);
    }
  }

  return (
    <div>
      <section className="pl-40 flex flex-wrap">
        <div className="mr-16 mt-20">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form className="container w-160" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                {...register("email")} 
                placeholder="Email"
                autoComplete="email"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="my-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                {...register("password")}
                placeholder="Password"
                autoComplete="new-password"
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
              <button 
              className="bg-teal-500 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 transition transform hover:scale-105 my-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer? {" "}
              <Link
                className="text-teal-500 hover:underline"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&
          auto=format&fit=crop&ixlib=rb-4.0.3&
          ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
          "
          alt=""
          className="h-260 w-[40%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  )
}
export default Login