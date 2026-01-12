import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RestrictedRoute = ({ children, redirectTo = "/" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const shouldRedirect = isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
};

export default RestrictedRoute;