import { PlaceCardContainerProps } from './type-props-place-card-container';
import PlaceCardContent from './place-card-content/place-card-content';
import PlaceCardLink from './place-card-components/place-card-link';

export default function PlaceCardCities({ offerPreview, handleHoverCard }: PlaceCardContainerProps): JSX.Element {

  return (
    <article
      {...(handleHoverCard && {
        onMouseEnter: () => handleHoverCard(offerPreview.id),
        onMouseLeave: () => handleHoverCard(null),
      })}
      className="cities__card place-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <PlaceCardLink offerId={offerPreview.id}>
          <img className="place-card__image" src={offerPreview.previewImage} width="260" height="200" alt="Place image" />
        </PlaceCardLink>
      </div>
      <div className="place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}
