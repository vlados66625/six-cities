import { memo } from 'react';
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';
import { offerSelectors } from '../../../../store/slices/offer';
import ReviewsForm from './reviews-form';
import ReviewsList from './reviews-list';
import TitleReviews from './title';

type ReviewsProps = {
  idDetailedOffer: string;
}

function Reviews({ idDetailedOffer }: ReviewsProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);
  const reviewsOffer = useAppSelector(offerSelectors.reviewsOffer);

  return (
    <section className="offer__reviews reviews">
      <TitleReviews сountReviews={reviewsOffer.length} />
      <ReviewsList reviewsOffer={reviewsOffer} />
      {isAuth && <ReviewsForm offerId={idDetailedOffer} />}
    </section>
  );
}

const ReviewsMemo = memo(Reviews);

export default ReviewsMemo;
