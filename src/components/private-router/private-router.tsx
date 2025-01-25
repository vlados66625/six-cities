import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: string;
}

export default function PrivateRoute({ children, authorizationStatus }: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth ?
      children :
      <Navigate to={`/${AppRoute.Login}`} />
  );
}
