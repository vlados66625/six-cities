import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { authorizationSelectors } from '../../store/slices/authorization';

type PrivateRouteProps = {
  children: JSX.Element;
  requireAuth: boolean;
}

export default function PrivateRoute({ children, requireAuth }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  if (requireAuth && !isAuth) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (!requireAuth && isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return children;
}
