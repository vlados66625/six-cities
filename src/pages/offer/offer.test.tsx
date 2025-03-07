import { render, screen } from '@testing-library/react';
import Offer from './offer';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { createFakeDetailedOffer } from '../../test-utils/mock/detailed-offer';
import { createFakeOffersPreview } from '../../test-utils/mock/offers';

describe('Component: Offer', () => {
  it('должен рендериться корректно, когда detailedOffer не равен null и isLoadingOffer === false и offersNearby не пустой', () => {
    const fakeDetailedOffer = createFakeDetailedOffer();
    const fakeDetailedOfferWithPremium = { ...fakeDetailedOffer, isPremium: true };
    const fakeOffersPreview = createFakeOffersPreview(3);
    const fakeStore = createFakeStore({
      offer: {
        detailedOffer: fakeDetailedOfferWithPremium,
        reviewsOffer: [],
        offersNearby: fakeOffersPreview,
        isLoadingOffer: false,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });

    const componentWithRouter = withRouter(<Offer />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('offer')).toBeInTheDocument();
    expect(screen.getByTestId('gallery')).toBeInTheDocument();
    expect(screen.getByTestId('premium-mark-container')).toBeInTheDocument();
    expect(screen.getByTestId('main-info-container')).toBeInTheDocument();
    expect(screen.getByText(/What's inside/)).toBeInTheDocument();
    expect(screen.getByTestId('host-container')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('offers-nearby-container')).toBeInTheDocument();
  });

  it('должен рендериться Loading, когда detailedOffer равен null и isLoadingOffer = true', () => {
    const fakeStore = createFakeStore({
      offer: {
        detailedOffer: null,
        reviewsOffer: [],
        offersNearby: [],
        isLoadingOffer: true,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });

    const componentWithRouter = withRouter(<Offer />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
    expect(screen.queryByTestId('host-container')).toBeNull();
  });

  it('не должен рендериться, когда detailedOffer равен null', () => {
    const fakeStore = createFakeStore({
      offer: {
        detailedOffer: null,
        reviewsOffer: [],
        offersNearby: [],
        isLoadingOffer: false,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });

    const componentWithRouter = withRouter(<Offer />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByTestId('host-container')).toBeNull();
  });
});
