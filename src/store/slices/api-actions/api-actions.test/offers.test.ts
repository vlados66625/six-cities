import { createAPI } from '../../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from '../../../../test-utils/types';
import { State } from '../../../../types/state';
import { extractActionsTypes } from '../../../../test-utils/util';
import { APIRoute, sixCities } from '../../../../const';
import {
  fetchFavoriteOffersAction,
  fetchOffersPreviewAction,
} from '../offers';
import { createFakeOffersPreview, createFakeFavoritesOffers } from '../../../../test-utils/factories/offers';
import { SortingOptions } from '../../../../util';

describe('Async actions (offers)', () => {
  const api = createAPI();
  const mockApiAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<Pick<State, 'offers'>, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: false,
        sortingName: SortingOptions[0].name,
      },
    });
  });

  describe('fetchOffersPreviewAction', () => {
    it('должен вернуть значение "offersPreview" и вызвать dispatch с "fetchOffersPreviewAction.pending" и "fetchOffersPreviewAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeOffersPreview = createFakeOffersPreview(5);
      mockApiAdapter.onGet(APIRoute.Offers).reply(200, fakeOffersPreview);

      const result = (await store.dispatch(fetchOffersPreviewAction())).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersPreviewAction.pending.type,
        fetchOffersPreviewAction.fulfilled.type,
      ]);
      expect(result).toEqual(fakeOffersPreview);
    });

    it('должен вызвать dispatch с "fetchOffersPreviewAction.pending" и "fetchOffersPreviewAction.rejected" при ответе от сервера со статусом 400', async () => {
      mockApiAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersPreviewAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersPreviewAction.pending.type,
        fetchOffersPreviewAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('должен вернуть значение "favoritesOffers" и вызвать dispatch с "fetchFavoriteOffersAction.pending" и "fetchFavoriteOffersAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeFavoriteOffers = createFakeFavoritesOffers(3);
      mockApiAdapter.onGet(APIRoute.Favorite).reply(200, fakeFavoriteOffers);

      const result = (await store.dispatch(fetchFavoriteOffersAction())).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);
      expect(result).toEqual(fakeFavoriteOffers);
    });

    it('должен вызвать dispatch с "fetchFavoriteOffersAction.pending" и "fetchFavoriteOffersAction.rejected" при ответе от сервера со статусом 400', async () => {
      mockApiAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });
});
