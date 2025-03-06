import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top';

import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-router/private-router';
import { AppRoute } from '../../const';

import { useActionCreators, useAppSelector } from '../../hooks';
import { authorizationActions, authorizationSelectors } from '../../store/slices/authorization';
import { offersActions } from '../../store/slices/offers';

export default function App(): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);

  const { fetchAuthorizationStatusAction } = useActionCreators(authorizationActions);
  const { fetchFavoriteOffersAction } = useActionCreators(offersActions);

  useEffect(() => {
    fetchAuthorizationStatusAction();
  }, [fetchAuthorizationStatusAction]);

  useEffect(() => {
    if (isAuth) {
      fetchFavoriteOffersAction();
    }
  }, [fetchFavoriteOffersAction, isAuth]);


  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute requireAuth >
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.OfferId} element={<Offer />} />
          <Route path={AppRoute.Login} element={
            <PrivateRoute requireAuth={false}>
              <Login />
            </PrivateRoute>
          }
          />
        </Route>
        <Route path={AppRoute.Error} element={<Error404 />} />
      </Routes>
    </HelmetProvider>
  );
}
