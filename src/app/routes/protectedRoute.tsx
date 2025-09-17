import React, { type FC } from "react"
import { Navigate } from "react-router"
import { useAuth } from "../providers"

type ProtectedRouteProps = {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute