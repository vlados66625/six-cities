import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import Layout from '../../components/layout/layout';
import PrivateRoute from '../../components/private-routers/private-router';
import { AppRoute } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
type AppProps = {
  rentalOffer: number;
}

export default function App({ rentalOffer }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main rentalOffer={rentalOffer} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute requireAuth >
                <Favorites />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<Offer />} />
            <Route path={AppRoute.Login} element={
              <PrivateRoute requireAuth={false}>
                <Login />
              </PrivateRoute>
            }
            />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
