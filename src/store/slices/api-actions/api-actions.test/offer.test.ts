import { createAPI } from '../../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from '../../../../test-utils/types';
import { State } from '../../../../types/state';
import { extractActionsTypes } from '../../../../test-utils/util';
import { APIRoute } from '../../../../const';
import { faker } from '@faker-js/faker';
import {
  fetchDetailedOfferAction,
  fetchOffersNearbyAction,
  fetchReviewsOfferAction,
  reviewPostAction,
  setFavoriteOfferAction
} from '../offer';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';
import { createFakeOfferPreview, createFakeOffersPreview } from '../../../../test-utils/mock/offers';
import { createFakeReviewOffer, createFakeReviewsOffer } from '../../../../test-utils/mock/review-offer';

describe('Async actions', () => {
  const api = createAPI();
  const mockApiAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<Pick<State, 'offer'>, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  let offerId: string;

  beforeEach(() => {
    store = mockStoreCreator({
      offer: {
        reviewsOffer: [],
        detailedOffer: null,
        offersNearby: [],
        isLoadingOffer: false,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });
    offerId = faker.string.uuid();
  });

  describe('fetchDetailedOfferAction', () => {

    it('доджен вернуть значение "detailedOffer" и вызвать dispatch с "fetchDetailedOfferAction.pending" и "fetchDetailedOfferAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeDetailedOffer = createFakeDetailedOffer();

      mockApiAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, fakeDetailedOffer);

      const result = (await store.dispatch(fetchDetailedOfferAction(offerId))).payload;

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchDetailedOfferAction.pending.type,
        fetchDetailedOfferAction.fulfilled.type
      ]);
      expect(result).toEqual(fakeDetailedOffer);
    });

    it('доджен вызвать dispatch с "fetchDetailedOfferAction.pending" и "fetchDetailedOfferAction.rejected" при ответе от сервера со статусом 404', async () => {
      mockApiAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404);

      await store.dispatch(fetchDetailedOfferAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchDetailedOfferAction.pending.type,
        fetchDetailedOfferAction.rejected.type
      ]);
    });

  });

  describe('fetchOffersNearbyAction', () => {
    it('должен вернуть значение "offersNearby" и вызвать dispatch с "fetchOffersNearbyAction.pending" и "fetchOffersNearbyAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeOffersNearby = createFakeOffersPreview(3);

      mockApiAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, fakeOffersNearby);

      const result = (await store.dispatch(fetchOffersNearbyAction(offerId))).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);
      expect(result).toEqual(fakeOffersNearby);
    });

    it('должен вызвать dispatch с "fetchOffersNearbyAction.pending" и "fetchOffersNearbyAction.rejected" при ответе от сервера со статусом 404', async () => {
      mockApiAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(404);

      await store.dispatch(fetchOffersNearbyAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsOfferAction', () => {
    it('должен вернуть значение "reviewsOffer" и вызвать dispatch с "fetchReviewsOfferAction.pending" и "fetchReviewsOfferAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeReviewsOffer = createFakeReviewsOffer(3);

      mockApiAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, fakeReviewsOffer);

      const result = (await store.dispatch(fetchReviewsOfferAction(offerId))).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsOfferAction.pending.type,
        fetchReviewsOfferAction.fulfilled.type,
      ]);
      expect(result).toEqual(fakeReviewsOffer);
    });

    it('должен вызвать dispatch с "fetchReviewsOfferAction.pending" и "fetchReviewsOfferAction.rejected" при ответе от сервера со статусом 404', async () => {
      mockApiAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(404);

      await store.dispatch(fetchReviewsOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsOfferAction.pending.type,
        fetchReviewsOfferAction.rejected.type,
      ]);
    });
  });

  describe('reviewPostAction', () => {
    it('должен вернуть значение "review" и вызвать dispatch с "reviewPostAction.pending" и "reviewPostAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeReviewOffer = createFakeReviewOffer();
      const unlocksBtnSubmitAndResetForm = vi.fn();

      mockApiAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, fakeReviewOffer);

      const result = (await store.dispatch(reviewPostAction({ offerId, comment: fakeReviewOffer.comment, rating: fakeReviewOffer.rating, unlocksBtnSubmitAndResetForm }))).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewPostAction.pending.type,
        reviewPostAction.fulfilled.type,
      ]);
      expect(result).toEqual(fakeReviewOffer);
      expect(unlocksBtnSubmitAndResetForm).toHaveBeenCalledTimes(1);
    });

    it('должен вызвать dispatch с "reviewPostAction.pending" и "reviewPostAction.rejected" при ответе от сервера со статусом 400', async () => {
      mockApiAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(400);
      const unlocksBtnSubmitAndResetForm = vi.fn();

      await store.dispatch(reviewPostAction({ offerId, comment: 'test', rating: 5, unlocksBtnSubmitAndResetForm }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewPostAction.pending.type,
        reviewPostAction.rejected.type,
      ]);
    });
  });

  describe('setFavoriteOfferAction', () => {
    it('должен вернуть значение "setFavoriteOffer" и вызвать dispatch с "setFavoriteOfferAction.pending" и "setFavoriteOfferAction.fulfilled" при ответе от сервера со статусом 200', async () => {
      const fakeOfferPreview = createFakeOfferPreview();
      const offerIsFavorite = true;

      mockApiAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${Number(offerIsFavorite)}`).reply(200, fakeOfferPreview);

      const result = (await store.dispatch(setFavoriteOfferAction({ offerId, offerIsFavorite }))).payload;
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        setFavoriteOfferAction.pending.type,
        setFavoriteOfferAction.fulfilled.type,
      ]);
      expect(result).toEqual({ offer: fakeOfferPreview, offerIsFavorite });
    });

    it('должен вызвать dispatch с "setFavoriteOfferAction.pending" и "setFavoriteOfferAction.rejected" при ответе от сервера со статусом 400', async () => {
      const offerIsFavorite = true;
      mockApiAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${Number(offerIsFavorite)}`).reply(400);

      await store.dispatch(setFavoriteOfferAction({ offerId, offerIsFavorite }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        setFavoriteOfferAction.pending.type,
        setFavoriteOfferAction.rejected.type,
      ]);
    });
  });
});
