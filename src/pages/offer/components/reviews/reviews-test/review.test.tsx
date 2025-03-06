import { render, screen } from '@testing-library/react';
import Review from '../review';
import { createFakeReviewOffer } from '../../../../../test-utils/mock/review-offer';

describe('Component: Review', () => {
  it('должен рендериться корректно', () => {
    const fakeReviewOffer = createFakeReviewOffer();

    render(<Review reviewOffer={fakeReviewOffer} />);

    expect(screen.getByText(fakeReviewOffer.comment)).toBeInTheDocument();
  });
});
