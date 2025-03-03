import { offerSlice } from '../../offer';
import { offerSelectors } from '../../offer';
import { createFakeReviewOffers } from '../../../../test-utils/factories/review-offer';
import { createFakeDetailedOffer } from '../../../../test-utils/factories/detailed-offer';
import { createFakeOffersPreview } from '../../../../test-utils/factories/offers';
import { faker } from '@faker-js/faker';

describe('offer selectors', () => {
  const fakeReviewOffers = createFakeReviewOffers(3);
  const fakeDetailedOffer = createFakeDetailedOffer();
  const fakeOffersNearby = createFakeOffersPreview(3);
  const fakeIdFocusCard = faker.string.uuid();

  const state = {
    [offerSlice.name]: {
      reviewsOffer: fakeReviewOffers,
      detailedOffer: fakeDetailedOffer,
      offersNearby: fakeOffersNearby,
      isLoadingOffer: false,
      idFocusCard: fakeIdFocusCard,
      isFavoriteBtnDisabled: false,
    }
  };

  it('should return reviewsOffer from state ', () => {
    const { reviewsOffer } = state[offerSlice.name];
    const result = offerSelectors.reviewsOffer(state);
    expect(result).toEqual(reviewsOffer);
  });

  it('should return detailedOffer from state', () => {
    const { detailedOffer } = state[offerSlice.name];
    const result = offerSelectors.detailedOffer(state);
    expect(result).toEqual(detailedOffer);
  });

  it('should return offersNearby from state', () => {
    const { offersNearby } = state[offerSlice.name];
    const result = offerSelectors.offersNearby(state);
    expect(result).toEqual(offersNearby);
  });

  it('should return isLoadingOffer from state', () => {
    const { isLoadingOffer } = state[offerSlice.name];
    const result = offerSelectors.isLoadingOffer(state);
    expect(result).toEqual(isLoadingOffer);
  });

  it('should return idFocusCard from state', () => {
    const { idFocusCard } = state[offerSlice.name];
    const result = offerSelectors.idFocusCard(state);
    expect(result).toEqual(idFocusCard);
  });

  it('should return isFavoriteBtnDisabled from state', () => {
    const { isFavoriteBtnDisabled } = state[offerSlice.name];
    const result = offerSelectors.isFavoriteBtnDisabled(state);
    expect(result).toEqual(isFavoriteBtnDisabled);
  });
});
