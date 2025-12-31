import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

const AdminRoute = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo)

  return userInfo && (userInfo.role === "admin" || userInfo.role === "superadmin") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}
export default AdminRoute