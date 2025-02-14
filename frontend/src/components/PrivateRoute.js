import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Restrict access to /admin only for admins
  if (window.location.pathname === "/admin" && role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
