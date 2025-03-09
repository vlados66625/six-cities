import { ReviewOffer } from '../../../../types/review-offer';
import Review from './review';

type ReviewsListProps = {
  reviewsOffer: ReviewOffer[];
}

export default function ReviewsList({ reviewsOffer }: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list" data-testid="reviews-list">
      {reviewsOffer.map((reviewOffer) => (
        <Review reviewOffer={reviewOffer} key={reviewOffer.id} />
      ))}
    </ul>
  );
}
