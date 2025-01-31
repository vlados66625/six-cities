import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getIsAuth } from '../../util';

export function useLayoutState() {
  const { pathname } = useLocation();

  let pageBlockClassName = '';
  let shouldRenderNav = true;
  let shouldRenderFooter = false;
  const isAuth = getIsAuth();
  let isLogoActive = false;

  switch (pathname) {
    case AppRoute.Root:
      pageBlockClassName = ' page--gray page--main';
      isLogoActive = true;
      break;
    case AppRoute.Login:
      shouldRenderNav = false;
      pageBlockClassName = ' page--gray page--login';
      break;
    case AppRoute.Offer:
      pageBlockClassName = '';
      break;
    case AppRoute.Favorites:
      pageBlockClassName = '';
      shouldRenderFooter = true;
      break;
  }

  return { pageBlockClassName, shouldRenderNav, shouldRenderFooter, isAuth, isLogoActive };
}
