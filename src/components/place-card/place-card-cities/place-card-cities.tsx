import { PlaceCardContainerProps } from '../type-props-place-card-container';
import PlaceCardContent from '../place-card-content/place-card-content';
import PlaceCardLink from '../place-card-components/place-card-link/place-card-link';
import { useHoverCard } from '../../../hooks/use-hover-card/use-hover-card';
import { memo } from 'react';

function PlaceCardCities({ offerPreview, isSupportsHover }: PlaceCardContainerProps): JSX.Element {
  const { handleMouseEnter, handleMouseLeave } = useHoverCard(offerPreview.id, isSupportsHover);

  return (
    <article
      {...(isSupportsHover && {
        onMouseEnter: () => handleMouseEnter(),
        onMouseLeave: () => handleMouseLeave(),
      })}
      className="cities__card place-card"
      data-testid="city-card"
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

const PlaceCardCitiesMemo = memo(PlaceCardCities);

export default PlaceCardCitiesMemo;
