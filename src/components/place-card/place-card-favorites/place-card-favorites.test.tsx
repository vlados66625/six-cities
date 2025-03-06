import { render, screen } from '@testing-library/react';
import PlaceCardFavorites from './place-card-favorites';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { createFakeOfferPreview } from '../../../test-utils/mock/offers';

describe('Component: Bookmarks', () => {
  it('должен рендериться корректно', () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardFavorites offerPreview={fakeOffer} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('favorites-card')).toBeInTheDocument();
  });
});
