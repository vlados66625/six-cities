import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsAuth } from '../../util';

type PrivateRouteProps = {
  children: JSX.Element;
  requireAuth: boolean;
}

export default function PrivateRoute({ children, requireAuth }: PrivateRouteProps): JSX.Element {

  const isAuth = getIsAuth();

  if (requireAuth && !isAuth) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (!requireAuth && isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return children;
}
