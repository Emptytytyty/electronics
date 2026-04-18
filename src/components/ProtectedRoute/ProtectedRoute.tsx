import type { ReactNode } from "react";
import { getIsAuthChecked, getUserSelector } from "../../services/slices/UserSlice";
import { useSelector } from "../../services/store";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean,
  children: ReactNode,
}

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <h2>Загрузка...</h2>;
  }

  if (!onlyUnAuth && !user)
    return <Navigate replace state={{ from: location }} to={'/login'} />;

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return <>{children}</>;
};