import { render, screen } from '@testing-library/react';
import PlaceCardCities from './place-card-cities';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { createFakeOfferPreview } from '../../../test-utils/mock/offers';

describe('Component: Bookmarks', () => {
  it('должен рендериться корректно', () => {
    const countLinksInCards = 2;
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardCities offerPreview={fakeOffer} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const links = screen.getAllByTestId('place-card-link');

    expect(screen.getByTestId('city-card')).toBeInTheDocument();
    expect(links.length).toBe(countLinksInCards);
    expect(screen.getByTestId('place-card-content')).toBeInTheDocument();
  });
});
