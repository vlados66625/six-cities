import { render, screen } from '@testing-library/react';
import PlaceCardNearPlaces from './place-card-near-places';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { createFakeOfferPreview } from '../../../test-utils/mock/offers';

describe('Component: Bookmarks', () => {
  it('должен рендериться корректно', () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardNearPlaces offerPreview={fakeOffer} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('near-card')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-link')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-content')).toBeInTheDocument();
  });
});
