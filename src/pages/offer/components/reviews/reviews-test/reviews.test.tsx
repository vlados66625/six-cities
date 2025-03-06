import { render, screen } from '@testing-library/react';
import Reviews from '../reviews';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';

describe('Component: Reviews', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<Reviews idDetailedOffer='test-id' />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
  });
});
