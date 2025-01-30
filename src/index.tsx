import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { RENTAL_OFFER } from './const';
import { offers } from './mock/offers';
import { reviewsOffer } from './mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      reviewsOffer={reviewsOffer}
      rentalOffer={RENTAL_OFFER}
    />
  </React.StrictMode>
);
