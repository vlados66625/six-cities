import { OffersPreview } from '../../mock/offers-preview';
import { OfferDetailed } from '../../mock/offer-detailed';
import { ReviewsOffer } from '../../mock/reviews-offer';
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
  offerDetailed: OfferDetailed;
  reviewsOffer: ReviewsOffer;
  rentalOffer: number;
}

export default function App({ offersPreview, reviewsOffer, rentalOffer, offerDetailed }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Main rentalOffer={rentalOffer} offersPreview={offersPreview} />} />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute requireAuth >
                <Favorites offersPreview={offersPreview} />
              </PrivateRoute>
            }
            />
            <Route path={AppRoute.Offer} element={<Offer offerDetailed={offerDetailed} offersPreview={offersPreview} reviewsOffer={reviewsOffer} />} />
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
