import { HelmetProvider } from 'react-helmet-async';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import HistoryRouter from '../components/history-route/history-route';
import { MemoryHistory, createMemoryHistory } from 'history';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { AppThunkDispatch } from './types';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockApiAdapter: MockAdapter;
}

export function withStore(component: JSX.Element, initialState: Partial<State>): ComponentWithMockStore {
  const api = createAPI();
  const mockApiAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent:
      <Provider store={mockStore}>
        {component}
      </Provider>
    ,
    mockStore,
    mockApiAdapter,
  };
}

export function withRouter(component: JSX.Element, history?: MemoryHistory) {
  const browserHistory = history ?? createMemoryHistory();

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        {component}
      </HistoryRouter>
    </HelmetProvider>
  );
}
