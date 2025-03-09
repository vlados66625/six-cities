import { render, screen } from '@testing-library/react';
import PlaceCards from './place-cards';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeOffersPreview } from '../../test-utils/mock/offers';
import { createFakeStore } from '../../test-utils/mock/store';

describe('Component: PlaceCards', () => {
  it('должен отрендерить карточки favorite', () => {
    const fakeOffersPreview = createFakeOffersPreview(3);
    const componentWithRouter = withRouter(<PlaceCards offersPreview={fakeOffersPreview} placeCard='favorite' />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;


    render(withStoreComponent);

    const cityCards = screen.getAllByTestId('favorites-card');
    expect(cityCards.length).toBe(fakeOffersPreview.length);
  });

  it('должен отрендерить карточки near', () => {
    const fakeOffersPreview = createFakeOffersPreview(3);
    const componentWithRouter = withRouter(<PlaceCards offersPreview={fakeOffersPreview} placeCard='near' />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;


    render(withStoreComponent);

    const cityCards = screen.getAllByTestId('near-card');
    expect(cityCards.length).toBe(fakeOffersPreview.length);
  });

  it('должен отрендерить карточки city', () => {
    const fakeOffersPreview = createFakeOffersPreview(3);
    const componentWithRouter = withRouter(<PlaceCards offersPreview={fakeOffersPreview} placeCard='city' />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;


    render(withStoreComponent);

    const cityCards = screen.getAllByTestId('city-card');
    expect(cityCards.length).toBe(fakeOffersPreview.length);
  });
});
