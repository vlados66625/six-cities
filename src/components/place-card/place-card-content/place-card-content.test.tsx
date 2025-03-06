import { render, screen } from '@testing-library/react';
import PlaceCardContent from './place-card-content';
import { withRouter, withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { createFakeOfferPreview } from '../../../test-utils/mock/offers';

describe('Component: PlaceCardContent', () => {
  it('должен рендериться корректно', () => {
    const fakeOffer = createFakeOfferPreview();
    const componentWithRouter = withRouter(<PlaceCardContent offerPreview={fakeOffer} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('place-card-content')).toBeInTheDocument();
  });
});
