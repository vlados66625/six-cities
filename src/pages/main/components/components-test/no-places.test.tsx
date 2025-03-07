import { render, screen } from '@testing-library/react';
import NoPlaces from '../no-places';
import { withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { sixCities } from '../../../../const';
import { SortingOptions } from '../../../../util';

describe('Component: NoPlaces', () => {
  it('должен рендериться корректно при isLoadingOffers === false', () => {
    const componentWithStore = withStore(<NoPlaces />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.queryByText(/загрузка/i)).not.toBeInTheDocument();
  });

  it('должен рендериться корректно при isLoadingOffers === true', () => {
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: true,
        sortingName: SortingOptions[0].name,
      },
    });

    const componentWithStore = withStore(<NoPlaces />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByText('No places to stay available')).not.toBeInTheDocument();
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });
});
