import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsAuth } from '../../util';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateLoginRoute({ children }: PrivateRouteProps): JSX.Element {
  return (
    getIsAuth() ?
      <Navigate to={AppRoute.Root} /> :
      children
  );
}
