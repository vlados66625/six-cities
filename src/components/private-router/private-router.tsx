import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import getAuthorizationStatus from '../../mock/get-authorization-status';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

export default function PrivateRoute({ children, isReverse }: PrivateRouteProps): JSX.Element {
  let shouldRenderChildren = getAuthorizationStatus() === AuthorizationStatus.Auth;
  if (isReverse) {
    shouldRenderChildren = !shouldRenderChildren;
  }

  return (
    shouldRenderChildren ?
      children :
      <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}
