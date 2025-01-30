import Main from './pages/main/main';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';
import Login from './pages/login/login';
import Error404 from './pages/error-404/error-404';
import Layout from './components/layout/layout';
import PrivateRoute from './components/private-router/private-router';
import { AppRoute } from './const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Offers } from './mock/offers';
import { ReviewsOffer } from './mock/reviews';

type RoutingProps = {
  offers: Offers;
  reviewsOffer: ReviewsOffer;
  rentalOffer: number;
}

export default function Routing({ offers, reviewsOffer, rentalOffer }: RoutingProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main rentalOffer={rentalOffer} offers={offers} />} />
            <Route path={AppRoute.Favorites} offers={offers} element={
              <PrivateRoute >
                <Favorites />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} reviewsOffer={reviewsOffer} element={<Offer />} />
            <Route path={AppRoute.Login} element={
              <PrivateRoute isLoginPage >
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
