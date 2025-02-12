import { OffersPreview } from '../../types/offer-types';
import { DetailedOffer } from '../../types/offer-types';
import { ReviewsOffer } from '../../types/review-offer';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Login from '../../pages/login/login';
import Error404 from '../../pages/error-404/error-404';
import PrivateRoute from '../private-router/private-router';
import { AppRoute } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

type AppProps = {
  offersPreview: OffersPreview;
  detailedOffer: DetailedOffer;
  reviewsOffer: ReviewsOffer;
}

export default function App({ offersPreview, reviewsOffer, detailedOffer }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Main offersPreview={offersPreview} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute requireAuth >
                <Favorites offersPreview={offersPreview} />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<Offer detailedOffer={detailedOffer} offersPreview={offersPreview} reviewsOffer={reviewsOffer} />} />
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
