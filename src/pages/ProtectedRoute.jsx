import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("jwt");
  return isAuthenticated ? children : <Navigate to="/login" />;
}
