import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../utils/getCookie';
import { ROUTES } from '../../routes/routes';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const tokenCustomer = getCookie('access_token');

  if (!tokenCustomer) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};
