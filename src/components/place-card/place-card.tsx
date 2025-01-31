import { getDataPlaceCard } from './util';
import { Offer } from '../../mock/offers';

type PlaceCardProps = {
  offer: Offer;
  handleHoverCard?: (idFocusCard: string | null) => void;
  isFavoritesBlock?: boolean;
  isCitiesBlock?: boolean;
  isNearPlacesBlock?: boolean;
}

export default function PlaceCard({ ...props }: PlaceCardProps): JSX.Element {
  const { articleClassName, imageWrapperClassname, infoClassName, imageWidth, imageHeight } = getDataPlaceCard(props);
  const { offer, handleHoverCard } = props;
  const maxRating = 5;

  return (
    <article
      {...(handleHoverCard && {
        onMouseEnter: () => handleHoverCard(offer.id),
        onMouseLeave: () => handleHoverCard(null),
      })}
      className={`${articleClassName}place-card`}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${imageWrapperClassname}place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </a>
      </div>
      <div className={`${infoClassName}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / maxRating * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div >
    </article >
  );
}
