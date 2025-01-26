import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import Layout from '../layout/layout';
import PrivateRouteProps from '../private-router/private-router';
import { AppRoute } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  dataMain: {
    RentalOffers: number;
  };
}

export default function App({ dataMain }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main dataMain={dataMain} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRouteProps >
                <Favorites />
              </PrivateRouteProps>
            }
            />
            <Route path={AppRoute.Offer} element={<Offer />} />
            <Route path={AppRoute.Login} element={
              <PrivateRouteProps isReverse >
                <Login />
              </PrivateRouteProps>
            }
            />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
