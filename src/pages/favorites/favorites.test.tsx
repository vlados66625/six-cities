import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { sixCities } from '../../const';
import { SortingOptions } from '../../util';
import { createFakeFavoritesOffers } from '../../test-utils/mock/offers';

describe('Component: Favorites', () => {
  it('должен рендериться корректно при isLoadingOffers = false', () => {
    const componentWithRouter = withRouter(<Favorites />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });

  it('должен рендериться Loading при isLoadingOffers = true', () => {
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: true,
        sortingName: SortingOptions[0].name,
      }
    });

    const componentWithRouter = withRouter(<Favorites />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('должен рендериться NoFavorites при favoritesOffers.length === 0', () => {
    const componentWithRouter = withRouter(<Favorites />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('не должен рендериться NoFavorites при favoritesOffers.length !== 0', () => {
    const fakeFavoritesOffers = createFakeFavoritesOffers(5);
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: fakeFavoritesOffers,
        isLoadingOffers: false,
        sortingName: SortingOptions[0].name,
      }
    });

    const componentWithRouter = withRouter(<Favorites />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites')).toBeInTheDocument();
    expect(screen.queryByText('Favorites (empty)')).not.toBeInTheDocument();
  });
});
