import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import Loader from "../../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/auth/login">{children}</Navigate>;
};

export default PrivateRoute;