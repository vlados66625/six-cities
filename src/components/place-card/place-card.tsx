import { getDataPlaceCard } from './util';
import { OfferPreview } from '../../mock/offers-preview';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  offerPreview: OfferPreview;
  handleHoverCard?: (idFocusCard: string | null) => void;
  isFavoritesBlock?: boolean;
  isCitiesBlock?: boolean;
  isNearPlacesBlock?: boolean;
}

export default function PlaceCard({ ...props }: PlaceCardProps): JSX.Element {
  const { articleClassName, imageWrapperClassname, infoClassName, imageWidth, imageHeight } = getDataPlaceCard(props);
  const { offerPreview, handleHoverCard } = props;
  const MAX_RATING = 5;

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
          <button className={`place-card__bookmark-button ${offerPreview.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
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
      </div >
    </article >
  );
}
