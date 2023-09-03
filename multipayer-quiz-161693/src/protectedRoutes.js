import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const useAuth = () => {
  const user = Cookies.get('user');
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;