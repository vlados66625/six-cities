import cn from 'classnames';
import { OfferPreview } from '../../../types/offer-types';
import { Link } from 'react-router-dom';
import { MAX_RATING } from '../../../const';

type PlaceCardContentProps = {
  offerPreview: OfferPreview;
};

export default function PlaceCardContent({ offerPreview }: PlaceCardContentProps): JSX.Element {
  return (
    <>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerPreview.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button type="button" className={cn(
          'place-card__bookmark-button',
          { 'place-card__bookmark-button--active': offerPreview.isFavorite },
          'button')}
        >
          <svg className="place-card__bookmark-icon" width={18} height={19}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${offerPreview.rating / MAX_RATING * 100}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offerPreview.id}`}>
          {offerPreview.title}
        </Link>
      </h2>
      <p className="place-card__type">{offerPreview.type}</p>
    </>
  );
}
