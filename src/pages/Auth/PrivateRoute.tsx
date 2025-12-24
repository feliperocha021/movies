import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

const PrivateRoute = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
export default PrivateRoute