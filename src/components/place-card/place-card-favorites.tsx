import { PlaceCardContainerProps } from './type-props-place-card-container';
import { Link } from 'react-router-dom';
import PlaceCardContent from './place-card-content/place-card-content';

export default function PlaceCardFavorites({ offerPreview, handleHoverCard }: PlaceCardContainerProps): JSX.Element {

  return (
    <article
      {...(handleHoverCard && {
        onMouseEnter: () => handleHoverCard(offerPreview.id),
        onMouseLeave: () => handleHoverCard(null),
      })}
      className="favorites__card place-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offerPreview.id}`}>
          <img className="place-card__image" src={offerPreview.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}
