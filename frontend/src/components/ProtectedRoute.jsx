
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  // Wait until the initial authentication check finishes.
  if (loading) {
    return <div className="p-8">Checking authentication...</div>;
  }

  // Redirect unauthenticated users to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check whether the user has permission to access this route.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
