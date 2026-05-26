import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/reduxHooks";

import { selectIsAuth } from "../features/auth/authSelectors";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
