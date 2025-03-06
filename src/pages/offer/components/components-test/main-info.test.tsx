import { render, screen } from '@testing-library/react';
import MainInfo from '../main-info';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { withRouter, withStore } from '../../../../test-utils/mock-component';

describe('Component: MainInfo', () => {
  it('должен рендериться корректно, когда передан detailedOffer', () => {
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
    const componentWithRouter = withRouter(<MainInfo />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    expect(screen.getByText(fakeDetailedOffer.title)).toBeInTheDocument();
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
    const componentWithRouter = withRouter(<MainInfo />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByTestId('main-info-container')).toBeNull();
  });
});
