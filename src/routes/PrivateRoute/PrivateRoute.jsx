import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../../components/Shared/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={location?.pathname} to="/auth/login">
      {children}
    </Navigate>
  );
};

export default PrivateRoute;