import { render, screen } from '@testing-library/react';
import OffersNearby from '../offers-nearby';
import { createFakeOffersPreview } from '../../../../test-utils/mock/offers';
import { withRouter, withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';

describe('Component: OffersNearby', () => {
  it('должен рендериться корректно при offersNearby.length > 0', () => {
    const fakeOffersPreview = createFakeOffersPreview(3);
    const componentWithRouter = withRouter(<OffersNearby offersNearby={fakeOffersPreview} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('не должен рендериться при offersNearby.length = 0', () => {
    const componentWithRouter = withRouter(<OffersNearby offersNearby={[]} />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.queryByText('Other places in the neighbourhood')).not.toBeInTheDocument();
    expect(screen.queryByTestId('offers-nearby-container')).toBeNull();
  });
});
