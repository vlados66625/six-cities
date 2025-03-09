import { render, screen } from '@testing-library/react';
import Loading from './loading';
import { withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { sixCities } from '../../const';
import { SortingOptions } from '../../util';

describe('Component: Loading', () => {
  it('должен рендериться корректно при isLoadingOffer === true', () => {
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

  it('должен рендериться корректно при isLoadingOffers === true', () => {
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: true,
        sortingName: SortingOptions[0].name,
      }
    });
    const componentWithStore = withStore(<Loading />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('не должен рендериться при isLoadingOffers === false и isLoadingOffer === false', () => {
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: false,
        sortingName: SortingOptions[0].name,
      },
      offer: {
        detailedOffer: null,
        reviewsOffer: [],
        offersNearby: [],
        isLoadingOffer: false,
        idFocusCard: null,
        isFavoriteBtnDisabled: false,
      }
    });
    const componentWithStore = withStore(<Loading />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();
  });
});
