import { rating, ReviewLenght } from '../../../../const';
import { Fragment, useState, ChangeEvent } from 'react';
import { getPluralForm } from '../../../../util';
import { FormEvent } from 'react';
import { offerActions } from '../../../../store/slices/offer';
import { useActionCreators } from '../../../../hooks';

type ReviewsFormProps = {
  offerId: string;
}

export default function ReviewsForm({ offerId }: ReviewsFormProps): JSX.Element {
  const { reviewPostAction } = useActionCreators(offerActions);

  const [review, setReview] = useState({ rating: 0, review: '' });
  const [btnSubmitDiabled, setBtnSubmitDiabled] = useState(false);
  function unlocksBtnSubmitAndResetForm({ isResetForm }: { isResetForm: boolean }) {
    if (isResetForm) {
      setReview({ rating: 0, review: '' });
    }
    setBtnSubmitDiabled(false);
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = evt.currentTarget;
    setReview({ ...review, [name]: value });
  }

  function handleReviewFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setBtnSubmitDiabled(true);
    reviewPostAction({
      offerId,
      comment: review.review,
      rating: Number(review.rating),
      unlocksBtnSubmitAndResetForm: unlocksBtnSubmitAndResetForm,
    });
  }

  return (
    <form onSubmit={handleReviewFormSubmit} className="reviews__form form" action="#" method="post" data-testid="reviews-form">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, label }) => (
          <Fragment key={label}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-${getPluralForm('star', value)}`}
              type="radio"
              onChange={handleChange}
              checked={value === Number(review.rating)}
              data-testid={`radio-${label}`}
            />
            <label
              htmlFor={`${value}-${getPluralForm('star', value)}`}
              className="reviews__rating-label form__rating-label"
              title={label}
              data-testid={`label-${label}`}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.review}
        onChange={handleChange}
        data-testid="reviews-textarea"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.review.length < ReviewLenght.Min || review.review.length > ReviewLenght.Max || review.rating === 0 || btnSubmitDiabled}
          data-testid="button-submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
