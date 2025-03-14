import { render, screen } from '@testing-library/react';
import PlaceCardLink from './place-card-link';
import { withRouter, withStore } from '../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../test-utils/mock/store';

describe('Component: PlaceCardLink', () => {
  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<PlaceCardLink offerId='test-id'><p>test-text</p></PlaceCardLink>);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    expect(screen.getByTestId('place-card-link')).toBeInTheDocument();
    expect(screen.getByText('test-text')).toBeInTheDocument();
  });
});
