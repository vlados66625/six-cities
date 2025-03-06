import { render, screen } from '@testing-library/react';
import FavoritesList from '../favorites-list';
import { withRouter, withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { createFakeFavoritesOffers } from '../../../../test-utils/mock/offers';


describe('Component: FavoritesList', () => {
  it('должен рендериться корректно', () => {
    const fakeFavoritesOffers = createFakeFavoritesOffers(5);
    const componentWithRouter = withRouter(<FavoritesList favoritesOffers={fakeFavoritesOffers} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });
});
