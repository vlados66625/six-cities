import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsAuth } from '../../util';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {

  return (
    getIsAuth() ?
      children :
      <Navigate to={AppRoute.Login} />
  );
}
