import { useLocation } from 'react-router-dom';
import getAuthorizationStatus from '../../mock/get-authorization-status';
import { AuthorizationStatus, AppRoute } from '../../const';

export function useLayoutState() {
  const authorizationStatus = getAuthorizationStatus();
  const { pathname } = useLocation();

  let pageBlockClassName = '';
  let shouldRenderNav = true;
  let shouldRenderFooter = false;
  let isAuth = false;
  let isLogoActive = false;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    isAuth = true;
  }

  switch (pathname) {
    case AppRoute.Root:
      pageBlockClassName = 'page--gray page--main';
      isLogoActive = true;
      break;
    case AppRoute.Login:
      shouldRenderNav = false;
      pageBlockClassName = 'page--gray page--login';
      break;
    case AppRoute.Offer:
      pageBlockClassName = 'page--gray page--login';
      break;
    case AppRoute.Favorites:
      pageBlockClassName = '';
      shouldRenderFooter = true;
      break;
  }

  return { pageBlockClassName, shouldRenderNav, shouldRenderFooter, isAuth, isLogoActive };
}
