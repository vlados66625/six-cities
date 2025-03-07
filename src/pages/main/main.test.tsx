import { render, screen } from '@testing-library/react';
import Main from './main';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { sixCities } from '../../const';
import { createFakeOffersPreview } from '../../test-utils/mock/offers';
import { SortingOptions } from '../../util';


describe('Component: Main', () => {
  it('должен рендериться корректно когда есть предложения', () => {
    const fakeOffersPreview = createFakeOffersPreview(7);
    const fakeOffersPreviewWithSixCities0 = fakeOffersPreview.map((offer) => {
      offer.city.name = sixCities[0];
      return offer;
    });

    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: fakeOffersPreviewWithSixCities0,
        favoritesOffers: [],
        isLoadingOffers: false,
        sortingName: SortingOptions[0].name,
      }
    });
    const componentWithRouter = withRouter(<Main />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const cityCards = screen.getAllByTestId('city-card');

    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(sixCities[0])).toBeInTheDocument();
    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(cityCards.length).toBe(fakeOffersPreview.length);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByText('No places to stay available')).not.toBeInTheDocument();
  });

  it('должен рендериться корректно когда нет предложений', () => {
    const fakeStore = createFakeStore({
      offers: {
        city: sixCities[0],
        offersPreview: [],
        favoritesOffers: [],
        isLoadingOffers: false,
        sortingName: SortingOptions[0].name,
      }
    });
    const componentWithRouter = withRouter(<Main />);
    const componentWithStore = withStore(componentWithRouter, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);


    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(sixCities[0])).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
