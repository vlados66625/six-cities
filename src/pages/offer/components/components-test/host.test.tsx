import { render, screen } from '@testing-library/react';
import Host from '../host';
import { createFakeDetailedOffer } from '../../../../test-utils/mock/detailed-offer';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { withStore } from '../../../../test-utils/mock-component';

describe('Component: Host', () => {
  it('должен рендериться корректно, когда detailedOffer не null', () => {
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
    const componentWithStore = withStore(<Host />, fakeStore);
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
  });

  it('не должен рендериться, когда detailedOffer null', () => {
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
    const componentWithStore = withStore(<Host />, fakeStore);
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    expect(screen.queryByTestId('host-container')).toBeNull();
  });
});
