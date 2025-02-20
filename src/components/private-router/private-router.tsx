import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useIsAuth } from '../../hooks/use-is-auth';

type PrivateRouteProps = {
  children: JSX.Element;
  requireAuth: boolean;
}

export default function PrivateRoute({ children, requireAuth }: PrivateRouteProps): JSX.Element {

  const isAuth = useIsAuth();

  if (requireAuth && !isAuth) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (!requireAuth && isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return children;
}
