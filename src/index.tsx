import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersPreviewAction, fetchAuthorizationStatusAction } from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';

store.dispatch(fetchAuthorizationStatusAction());
store.dispatch(fetchOffersPreviewAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider >
  </React.StrictMode>
);
