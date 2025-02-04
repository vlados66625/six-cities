import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { RENTAL_OFFER } from './const';
import { offersPreview } from './mock/offers-preview';
import { reviewsOffer } from './mock/reviews-offer';
import { detailedOffer } from './mock/detailed-offer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersPreview={offersPreview}
      detailedOffer={detailedOffer}
      reviewsOffer={reviewsOffer}
      rentalOffer={RENTAL_OFFER}
    />
  </React.StrictMode>
);
