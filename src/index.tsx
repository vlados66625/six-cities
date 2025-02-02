import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { RENTAL_OFFER } from './const';
import { offersPreview } from './mock/offers-preview';
import { reviewsOffer } from './mock/reviews-offer';
import { offerDetailed } from './mock/offer-detailed';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersPreview={offersPreview}
      offerDetailed={offerDetailed}
      reviewsOffer={reviewsOffer}
      rentalOffer={RENTAL_OFFER}
    />
  </React.StrictMode>
);
