import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import PrivateRouteProps from '../private-router/private-router';
import { AppRoute, AuthorizationStatus } from '../../const';
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
          <Route path={AppRoute.Root} >
            <Route index element={<Main dataMain={dataMain} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRouteProps authorizationStatus={AuthorizationStatus.NoAuth} >
                <Favorites />
              </PrivateRouteProps>
            }
            />
            <Route path={`${AppRoute.Offer}/:${AppRoute.ID}`} element={<Offer />} />
            <Route path={AppRoute.Login} element={<Login />} />
          </Route>
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
