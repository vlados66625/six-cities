import { faker } from '@faker-js/faker';
import { createFakeDetailedOffer } from '../../../../test-utils/factories/detailed-offer';
import { createFakeOffersPreview, createFakeOfferPreview } from '../../../../test-utils/factories/offers';
import { createFakeReviewOffer, createFakeReviewOffers } from '../../../../test-utils/factories/review-offer';
import { offerSlice } from '../../offer';
import { offerActions } from '../../offer';
import browserHistory from '../../../../browser-history';
import { AppRoute } from '../../../../const';

describe('offer reducers', () => {
  const fakeReviewOffers = createFakeReviewOffers(3);
  const fakeDetailedOffer = createFakeDetailedOffer();
  const fakeOffersNearby = createFakeOffersPreview(3);
  const fakeIdFocusCard = faker.string.uuid();

  const initialState = {
    reviewsOffer: [],
    detailedOffer: null,
    offersNearby: [],
    isLoadingOffer: false,
    idFocusCard: null,
    isFavoriteBtnDisabled: false,
  };

  vi.mock('../../browser-history', () => ({
    default: {
      location: { pathname: '' },
      push(path: string) {
        this.location.pathname = path;
      }
    }
  }));

  beforeEach(() => {
    browserHistory.push('');
  });

  it('должен вернуть initial state с пустым action', () => {
    const emptyAction = { type: '' };

    const result = offerSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть initial state с "undefiend" state и пустым action', () => {
    const emptyAction = { type: '' };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть state с переданным "idFocusCard" при action "setidFocusCard"', () => {
    const expectedState = {
      ...initialState,
      idFocusCard: fakeIdFocusCard,
    };

    const result = offerSlice.reducer(initialState, offerActions.setidFocusCard(fakeIdFocusCard));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "isLoadingOffer = true" при action "fetchDetailedOfferAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isLoadingOffer: true,
    };

    const result = offerSlice.reducer(initialState, offerActions.fetchDetailedOfferAction.pending('', fakeDetailedOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "isLoadingOffer = false" и переданным "detailedOffer" при action "fetchDetailedOfferAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      isLoadingOffer: true,
    };

    const expectedState = {
      ...initialState,
      isLoadingOffer: false,
      detailedOffer: fakeDetailedOffer,
    };

    const result = offerSlice.reducer(prevState, offerActions.fetchDetailedOfferAction.fulfilled(fakeDetailedOffer, '', fakeDetailedOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('должен вызвать browserHistory.push с AppRoute.Error при action "fetchDetailedOfferAction.rejected"', () => {

    offerSlice.reducer(initialState, offerActions.fetchDetailedOfferAction.rejected(null, '', fakeDetailedOffer.id));

    expect(browserHistory.location.pathname).toBe(AppRoute.Error);
  });

  it('должен вернуть state с переданным "offersNearby" при action "fetchOffersNearbyAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      detailedOffer: fakeDetailedOffer,
    };

    const expectedState = {
      ...initialState,
      offersNearby: fakeOffersNearby,
      detailedOffer: fakeDetailedOffer,
    };

    const result = offerSlice.reducer(prevState, offerActions.fetchOffersNearbyAction.fulfilled(fakeOffersNearby, '', fakeDetailedOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с переданным "reviewsOffer" при action "fetchReviewsOfferAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      detailedOffer: fakeDetailedOffer,
    };

    const expectedState = {
      ...initialState,
      reviewsOffer: fakeReviewOffers,
      detailedOffer: fakeDetailedOffer,
    };

    const result = offerSlice.reducer(prevState, offerActions.fetchReviewsOfferAction.fulfilled(fakeReviewOffers, '', fakeDetailedOffer.id));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с добавленным "reviewOffer" при action "reviewPostAction.fulfilled"', () => {
    const fakeReviewOffer = createFakeReviewOffer();
    const prevState = {
      ...initialState,
      reviewsOffer: fakeReviewOffers
    };
    const expectedState = {
      ...prevState,
      reviewsOffer: [...fakeReviewOffers, fakeReviewOffer],
    };
    const result = offerSlice.reducer(prevState, offerActions.reviewPostAction.fulfilled(fakeReviewOffer, '', { offerId: 'id', comment: 'comment', rating: 3, cb: () => { } }));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установленным значением "isFavoriteBtnDisabled = true" при action "setFavoriteOfferAction.pending"', () => {
    const expectedState = {
      ...initialState,
      isFavoriteBtnDisabled: true,
    };

    const result = offerSlice.reducer(initialState, offerActions.setFavoriteOfferAction.pending('', { offerId: 'offerId', offerIsFavorite: true }));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с установленным значением "isFavoriteBtnDisabled = false" при action "setFavoriteOfferAction.fulfilled"', () => {
    const fakeOffer = createFakeOfferPreview();

    const prevState = {
      ...initialState,
      isFavoriteBtnDisabled: true,
    };
    const expectedState = {
      ...initialState,
      isFavoriteBtnDisabled: false,
    };

    const result = offerSlice.reducer(prevState, offerActions.setFavoriteOfferAction.fulfilled({ offerIsFavorite: false, offer: fakeOffer }, '', { offerId: fakeOffer.id, offerIsFavorite: false }));

    expect(result).toEqual(expectedState);
  });
});
