import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-router/private-router';
import { AppRoute } from '../../const';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import ScrollToTop from '../scroll-to-top';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
      </HistoryRouter>
    </HelmetProvider>
  );
}
