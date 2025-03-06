import { offerSlice } from '../../offer';
import { offerSelectors } from '../../offer';
import { createFakeReviewsOffer } from '../../../../test-utils/mock/review-offer';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';
import { createFakeOffersPreview } from '../../../../test-utils/mock/offers';
import { faker } from '@faker-js/faker';
import { ReviewOffer } from '../../../../types/review-offer';
import { DetailedOffer, OfferPreview } from '../../../../types/offer-types';
import { State } from '../../../../types/state';

describe('offer selectors', () => {
  let fakeReviewOffers: ReviewOffer[];
  let fakeDetailedOffer: DetailedOffer;
  let fakeOffersNearby: OfferPreview[];
  let fakeIdFocusCard: string;
  let state: Pick<State, 'offer'>;

  beforeEach(() => {
    fakeReviewOffers = createFakeReviewsOffer(3);
    fakeDetailedOffer = createFakeDetailedOffer();
    fakeOffersNearby = createFakeOffersPreview(3);
    fakeIdFocusCard = faker.string.uuid();

    state = {
      [offerSlice.name]: {
        reviewsOffer: fakeReviewOffers,
        detailedOffer: fakeDetailedOffer,
        offersNearby: fakeOffersNearby,
        isLoadingOffer: false,
        idFocusCard: fakeIdFocusCard,
        isFavoriteBtnDisabled: false,
      }
    };
  });

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
    expect(result).toBe(isLoadingOffer);
  });

  it('should return idFocusCard from state', () => {
    const { idFocusCard } = state[offerSlice.name];
    const result = offerSelectors.idFocusCard(state);
    expect(result).toBe(idFocusCard);
  });

  it('should return isFavoriteBtnDisabled from state', () => {
    const { isFavoriteBtnDisabled } = state[offerSlice.name];
    const result = offerSelectors.isFavoriteBtnDisabled(state);
    expect(result).toBe(isFavoriteBtnDisabled);
  });
});
