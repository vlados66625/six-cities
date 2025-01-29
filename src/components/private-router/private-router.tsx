import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsAuth } from '../../util';

type PrivateRouteProps = {
  children: JSX.Element;
  isLoginPage?: boolean;
}

export default function PrivateRoute({ children, isLoginPage }: PrivateRouteProps): JSX.Element {
  let shouldRenderChildren = getIsAuth();
  if (isLoginPage) {
    shouldRenderChildren = !shouldRenderChildren;
  }

  return (
    shouldRenderChildren ?
      children :
      <Navigate to={isLoginPage ? AppRoute.Root : AppRoute.Login} />
  );
}
