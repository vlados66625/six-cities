import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offersPreview } from './mock/offers-preview';
import { reviewsOffer } from './mock/reviews-offer';
import { detailedOffer } from './mock/detailed-offer';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offersPreview={offersPreview}
        detailedOffer={detailedOffer}
        reviewsOffer={reviewsOffer}
      />
    </Provider >
  </React.StrictMode>
);
