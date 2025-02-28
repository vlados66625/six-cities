import { memo } from 'react';
import { useAppSelector } from '../../../../hooks';
import { authorizationSelectors } from '../../../../store/slices/authorization';
import { offerSelectors } from '../../../../store/slices/offer';
import { getPluralForm } from '../../../../util';
import ReviewsForm from './reviews-form';
import ReviewsList from './reviews-list';

type ReviewsProps = {
  idDetailedOffer: string;
}

function Reviews({ idDetailedOffer }: ReviewsProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);
  const reviewsOffer = useAppSelector(offerSelectors.reviewsOffer);

  return (
    <section className="offer__reviews reviews">
      {reviewsOffer.length === 0 ?
        <h2 className="reviews__title">There are no reviews, be the first</h2>
        :
        <h2 className="reviews__title">
          {getPluralForm('Review', reviewsOffer.length)} · <span className="reviews__amount">{reviewsOffer.length}</span>
        </h2>}
      <ReviewsList reviewsOffer={reviewsOffer} />
      {isAuth && <ReviewsForm offerId={idDetailedOffer} />}
    </section>
  );
}

const ReviewsMemo = memo(Reviews);

export default ReviewsMemo;
