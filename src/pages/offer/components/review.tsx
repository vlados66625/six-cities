import { ReviewOffer } from '../../../types/review-offer';
import { getFormatedDate } from '../../../util';
import { DateFormat } from '../../../const';
import { getRoundedRatingInPercentage } from '../../../util';

type ReviewProps = {
  reviewOffer: ReviewOffer;
}

export default function Review({ reviewOffer }: ReviewProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={reviewOffer.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {reviewOffer.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getRoundedRatingInPercentage(reviewOffer.rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {reviewOffer.comment}
        </p>
        <time className="reviews__time" dateTime={getFormatedDate(reviewOffer.date, DateFormat.FullYearMonthDay)}>{getFormatedDate(reviewOffer.date, DateFormat.FullMonthFullYear)}</time>
      </div>
    </li>
  );
}
