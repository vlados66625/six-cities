import cn from 'classnames';
import { getDataPlaceCard } from './util';
import { OfferPreview } from '../../types/offer-types';
import { Link } from 'react-router-dom';
import { MAX_RATING } from '../../const';

type PlaceCardProps = {
  offerPreview: OfferPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
  variant?: 'favorites' | 'cities' | 'near-places';
};

export default function PlaceCard({ offerPreview, handleHoverCard, variant }: PlaceCardProps): JSX.Element {
  const { articleClassName, imageWrapperClassname, infoClassName, imageWidth, imageHeight } = getDataPlaceCard(variant);

  return (
    <article
      {...(handleHoverCard && {
        onMouseEnter: () => handleHoverCard(offerPreview.id),
        onMouseLeave: () => handleHoverCard(null),
      })}
      className={`${articleClassName}place-card`}
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${imageWrapperClassname}place-card__image-wrapper`}>
        <Link to={`/offer/${offerPreview.id}`}>
          <img className="place-card__image" src={offerPreview.previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>
      <div className={`${infoClassName}place-card__info`}>
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
      </div>
    </article>
  );
}
