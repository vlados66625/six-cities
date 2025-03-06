import { render, screen } from '@testing-library/react';
import Offer from './offer';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { createFakeDetailedOffer } from '../../test-utils/mock/detailed-offer';

describe('Component: Offer', () => {
  it('должен рендериться корректно, когда detailedOffer не равен null', () => {
    const fakeDetailedOffer = createFakeDetailedOffer();
    const fakeStore = createFakeStore({
      offer: {
        detailedOffer: fakeDetailedOffer,
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

    expect(screen.getByTestId('offer')).toBeInTheDocument();
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
