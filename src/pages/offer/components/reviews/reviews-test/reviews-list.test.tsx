import { render, screen } from '@testing-library/react';
import ReviewsList from '../reviews-list';
import { createFakeReviewsOffer } from '../../../../../test-utils/mock/review-offer';

describe('Component: ReviewsList', () => {
  it('должен рендериться корректно', () => {
    const fakeReviewOffer = createFakeReviewsOffer(3);

    render(<ReviewsList reviewsOffer={fakeReviewOffer} />);

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });
});
