import { render, screen } from '@testing-library/react';
import ReviewsForm from '../reviews-form';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';

describe('Component: ReviewsForm', () => {
  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<ReviewsForm offerId='test-id'/>, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
