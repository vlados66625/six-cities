import { PlaceCardContainerProps } from '../type-props-place-card-container';
import PlaceCardLink from '../place-card-components/place-card-link';
import PlaceCardContent from '../place-card-content/place-card-content';
import { memo } from 'react';
import { useHoverCard } from '../../../hooks/use-hover-card';

function PlaceCardFavorites({ offerPreview, isSupportsHover }: PlaceCardContainerProps): JSX.Element {
  const { handleMouseEnter, handleMouseLeave } = useHoverCard(offerPreview.id, isSupportsHover);

  return (
    <article
      {...(isSupportsHover && {
        onMouseEnter: () => handleMouseEnter(),
        onMouseLeave: () => handleMouseLeave(),
      })}
      className="favorites__card place-card"
      data-testid="favorites-card"
    >
      {offerPreview.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <PlaceCardLink offerId={offerPreview.id}>
          <img className="place-card__image" src={offerPreview.previewImage} width="150" height="110" alt="Place image" />
        </PlaceCardLink>
      </div>
      <div className="favorites__card-info place-card__info">
        <PlaceCardContent offerPreview={offerPreview} />
      </div>
    </article>
  );
}

const PlaceCardFavoritesMemo = memo(PlaceCardFavorites);

export default PlaceCardFavoritesMemo;
