import { render, screen } from '@testing-library/react';
import FavoritesItems from '../favorites-items';
import { withRouter, withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';
import { sixCities } from '../../../../const';
import { createFakeFavoritesOffers } from '../../../../test-utils/mock/offers';
import { useCityLinkClick } from '../../../../hooks/use-city-link-click/use-city-link-click';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../../../../hooks/use-city-link-click/use-city-link-click', () => ({
  useCityLinkClick: vi.fn(),
}));

describe('Component: FavoritesItems', () => {
  const handleCityLinkClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCityLinkClick as Mock).mockReturnValue(handleCityLinkClick);
  });

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

  it('при клике на ссылку города должен вызвать handleCityLinkClick', async () => {
    const favoritesOffersCount = 5;
    const fakeFavoritesOffers = createFakeFavoritesOffers(favoritesOffersCount);
    const componentWithRouter = withRouter(<FavoritesItems city={sixCities[0]} filteredByCityOffers={fakeFavoritesOffers} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('city-link'));

    expect(handleCityLinkClick).toHaveBeenCalledTimes(1);
  });
});
