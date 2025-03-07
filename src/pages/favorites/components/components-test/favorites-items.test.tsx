import { render, screen } from '@testing-library/react';
import FavoritesItems from '../favorites-items';
import { withRouter, withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { sixCities } from '../../../../const';
import { createFakeFavoritesOffers } from '../../../../test-utils/mock/offers';


describe('Component: FavoritesItems', () => {
  it('должен рендериться корректно', () => {
    const favoritesOffersCount = 5;
    const fakeFavoritesOffers = createFakeFavoritesOffers(favoritesOffersCount);
    const componentWithRouter = withRouter(<FavoritesItems city={sixCities[0]} filteredByCityOffers={fakeFavoritesOffers} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const cardsLength = screen.getAllByTestId('favorites-card').length;

    expect(screen.getByText(sixCities[0])).toBeInTheDocument();
    expect(cardsLength).toBe(favoritesOffersCount);
  });
});
