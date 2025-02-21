import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { offersSelectors } from '../../store/slices/offers';

type PrivateRouteProps = {
  children: JSX.Element;
  requireAuth: boolean;
}

export default function PrivateRoute({ children, requireAuth }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(offersSelectors.isAuth);

  if (requireAuth && !isAuth) {
    return <Navigate to={AppRoute.Login} />;
  }

  if (!requireAuth && isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  return children;
}
