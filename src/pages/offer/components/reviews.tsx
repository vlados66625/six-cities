import { useAppSelector } from '../../../hooks';
import { authorizationSelectors } from '../../../store/slices/authorization';
import { offersSelectors } from '../../../store/slices/offers';
import { getPluralForm } from '../../../util';
import Review from './review';
import ReviewsForm from './reviews-form';

type ReviewsProps = {
  idDetailedOffer: string;
}

export default function Reviews({ idDetailedOffer }: ReviewsProps): JSX.Element {
  const isAuth = useAppSelector(authorizationSelectors.isAuth);
  const reviewsOffer = useAppSelector(offersSelectors.reviewsOffer);

  return (
    <section className="offer__reviews reviews">
      {reviewsOffer.length === 0 ?
        <h2 className="reviews__title">There are no reviews, be the first</h2>
        :
        <h2 className="reviews__title">
          {getPluralForm('Review', reviewsOffer.length)} · <span className="reviews__amount">{reviewsOffer.length}</span>
        </h2>}
      <ul className="reviews__list">
        {reviewsOffer.map((reviewOffer) => (
          <Review reviewOffer={reviewOffer} key={reviewOffer.id} />
        ))}
      </ul>
      {isAuth && <ReviewsForm offerId={idDetailedOffer} />}
    </section>
  );
}
