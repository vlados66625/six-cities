import { PlaceCardContainerProps } from '../type-props-place-card-container';
import PlaceCardLink from '../place-card-components/place-card-link/place-card-link';
import PlaceCardContent from '../place-card-content/place-card-content';
import { memo } from 'react';
import { useHoverCard } from '../../../hooks/use-hover-card';

function PlaceCardNearPlaces({ offerPreview, isSupportsHover }: PlaceCardContainerProps): JSX.Element {
  const { handleMouseEnter, handleMouseLeave } = useHoverCard(offerPreview.id, isSupportsHover);

  return (
    <article
      {...(isSupportsHover && {
        onMouseEnter: () => handleMouseEnter(),
        onMouseLeave: () => handleMouseLeave(),
      })}
      className="near-places__card place-card"
      data-testid="near-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="near-places__image-wrapper place-card__image-wrapper">
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

const PlaceCardNearPlacesMemo = memo(PlaceCardNearPlaces);

export default PlaceCardNearPlacesMemo;
