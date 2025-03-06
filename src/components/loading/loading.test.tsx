import { render, screen } from '@testing-library/react';
import Loading from './loading';
import { withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';

describe('Component: Loading', () => {
  it('должен рендериться корректно', () => {
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
    const componentWithStore = withStore(<Loading />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });
});
