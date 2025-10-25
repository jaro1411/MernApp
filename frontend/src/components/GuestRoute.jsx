import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function GuestRoute({ children }) {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
