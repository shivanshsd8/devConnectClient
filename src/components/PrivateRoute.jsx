import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DevconnectContext } from "../context/DevconnectContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(DevconnectContext);

  if (!isAuthenticated() ) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
}
