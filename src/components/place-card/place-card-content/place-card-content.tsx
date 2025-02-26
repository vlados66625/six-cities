import { useState } from 'react';
import cn from 'classnames';
import { OfferPreview } from '../../../types/offer-types';
import { Link } from 'react-router-dom';
import { getRoundedRatingInPercentage } from '../../../util';
import { useActionCreators } from '../../../hooks';
import { offersActions } from '../../../store/slices/offers';

type PlaceCardContentProps = {
  offerPreview: OfferPreview;
};

export default function PlaceCardContent({ offerPreview }: PlaceCardContentProps): JSX.Element {
  const { setFavoriteOfferAction } = useActionCreators(offersActions);

  const [isFavorite, setIsFavorite] = useState(offerPreview?.isFavorite);

  function handleBookmarkClick() {
    setFavoriteOfferAction({ offerId: offerPreview.id, offerIsFavorite: !isFavorite, setIsFavorite });
  }

  return (
    <>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offerPreview.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button onClick={handleBookmarkClick} type="button" className={cn(
          'place-card__bookmark-button',
          { 'place-card__bookmark-button--active': isFavorite },
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
          <span style={{ width: `${getRoundedRatingInPercentage(offerPreview.rating)}%` }}></span>
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
